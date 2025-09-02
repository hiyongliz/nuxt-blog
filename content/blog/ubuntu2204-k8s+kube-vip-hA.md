---
title: Ubuntu 2204 上搭建 k8s + kube-vip ha 集群
date: 2025-09-02
description: 在 Ubuntu 2204 上搭建高可用的 Kubernetes 集群，并使用 kube-vip 实现 VIP 服务
tags: [kubernetes, kube-vip, ubuntu]
---

## 资源清单

| 节点名称 | IP 地址      |
| -------- | ------------ |
| master-1 | 172.25.8.199 |
| master-2 | 172.25.8.224 |
| master-3 | 172.25.8.207 |
| worker-1 | 172.25.8.248 |
| worker-2 | 172.25.8.225 |
| worker-3 | 172.25.8.246 |
| vip      | 172.25.8.250 |

## 操作步骤

### 在所有节点上执行

设置 hosts

```bash
cat <<EOF > /etc/hosts
172.25.8.199 master-1
172.25.8.224 master-2
172.25.8.207 master-3
172.25.8.248 worker-1
172.25.8.225 worker-2
172.25.8.246 worker-3
EOF
```

安装 containerd

```bash
# step 1: 安装必要的一些系统工具
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# step 2: 信任 Docker 的 GPG 公钥
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Step 3: 写入软件源信息
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 4: 安装containerd
sudo apt-get update
sudo apt-get install -y containerd.io
```

配置 containerd

```bash
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml
# 修改 config.toml，将 SystemdCgroup 设置为 true
# 搜索 SystemdCgroup = false，改为 SystemdCgroup = true
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd
```

安装 kubeadm kubectl kubelet

```bash
apt-get update && apt-get install -y apt-transport-https
curl -fsSL https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/deb/Release.key |
    gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/deb/ /" |
    tee /etc/apt/sources.list.d/kubernetes.list
apt-get update
apt-get install -y kubelet kubeadm kubectl

```

配置内核参数

```bash
sudo modprobe overlay
sudo modprobe br_netfilter

cat <<EOF > /etc/sysctl.d/99-kubernetes-cri.conf
# ===============================================================
# Kubernetes 集群推荐内核参数 for Ubuntu 22.04
# ===============================================================

# -----------------
# 1. 网络与网桥设置 (Netfilter on Bridged Traffic)
# -----------------
# 允许 iptables/nftables 看到桥接流量，这是 kube-proxy 和网络策略正常工作的关键
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
# 启用 IPv4 流量转发，容器网络和 Service 访问的基础
net.ipv4.ip_forward                 = 1

# -----------------
# 2. 连接跟踪表 (Conntrack)
# -----------------
# 这是最常见的瓶颈之一。当 Pod 和 Service 数量增多时，默认值很容易被耗尽，
# 导致随机的网络连接中断。
#
# 将 conntrack 表的大小调大。计算方法：通常为 (节点RAM GB数 * 65536) / 16，
# 或者直接设置为一个足够大的值，如 1048576 (1M)。
net.netfilter.nf_conntrack_max = 1048576
# 增加 conntrack hash 表大小，通常是 conntrack_max 的 1/4 或 1/8。
net.netfilter.nf_conntrack_buckets = 262144
# 缩短 TCP ESTABLISHED 状态的 conntrack 超时时间，可以更快地回收条目。
# 默认是 432000 (5天)，对于长连接可能需要，但 K8s 集群内部短连接居多。
# 调整为 1 小时 (3600秒) 或更短是一个常见的做法。
net.netfilter.nf_conntrack_tcp_timeout_established = 3600

# -----------------
# 3. 文件系统 (File System)
# -----------------
# 增加系统级别的文件句柄最大数量。
# 每个 Pod、容器、进程和网络连接都会消耗文件句柄。
fs.file-max = 1000000
# 增加 inotify watches 的数量。
# kubelet、etcd 和一些监控/日志代理（如 Prometheus, Fluentd）
# 需要监视大量文件和目录的变化。
fs.inotify.max_user_watches = 524288

# -----------------
# 4. 虚拟内存 (Virtual Memory)
# -----------------
# 强烈建议禁用 Swap。
# K8s 的调度器是基于节点的 Memory Request/Limit 来决策的，它不希望操作系统
# 将 Pod 的内存换出到磁盘，这会导致性能急剧下降和行为不可预测。
# kubelet 默认情况下如果检测到 swap 开启会拒绝启动。
vm.swappiness = 0
# 防止 overcommit 导致 OOM killer 误杀重要进程。
# 值为 1 表示内核总是允许内存分配，即使可能没有足够的物理内存，
# 依赖 OOM killer 在内存不足时介入。这是 Redis 等应用推荐的设置。
vm.overcommit_memory = 1
# 当内核遇到 panic 时，1秒后自动重启。适用于生产环境的无人值守服务器。
kernel.panic = 1

# -----------------
# 5. TCP/IP 栈调优 (可选，但对高流量服务有益)
# -----------------
# 增加 TCP 连接队列的长度，应对突发的大量连接请求。
net.core.somaxconn = 32768
# 增加 TCP SYN 队列的长度，防止 SYN Flood 攻击或高并发连接。
net.ipv4.tcp_max_syn_backlog = 8192
# 允许将TIME-WAIT状态的套接字重新用于新的TCP连接，对于高并发短连接服务非常重要。
net.ipv4.tcp_tw_reuse = 1
# 增加 IP 端口范围，允许系统支持更多的出站连接。
net.ipv4.ip_local_port_range = 32768 65535

# -----------------
# 6. ARP 缓存 (可选，适用于大规模集群)
# -----------------
# 在 Pod 数量非常多的集群（例如上千个 Pod 在同一个 L2 网络），ARP 缓存可能成为瓶颈。
# 增加 ARP 缓存的阈值可以减少 ARP 垃圾回收的频率。
net.ipv4.neigh.default.gc_thresh1 = 1024
net.ipv4.neigh.default.gc_thresh2 = 4096
net.ipv4.neigh.default.gc_thresh3 = 8192

EOF

sudo sysctl --system
```

### 在 master 节点上执行

配置 kube-vip

```bash
# 设置VIP地址
export VIP=172.25.8.250
export INTERFACE=eth0
ctr image pull registry.cn-shenzhen.aliyuncs.com/lazylibrary/kube-vip:v0.6.3
ctr run --rm --net-host registry.cn-shenzhen.aliyuncs.com/lazylibrary/kube-vip:v0.6.3 vip \
/kube-vip manifest pod \
--interface $INTERFACE \
--vip $VIP \
--controlplane \
--services \
--arp \
--leaderElection | tee  /etc/kubernetes/manifests/kube-vip.yaml
```

### 在 master-1 上执行

初始化集群

```bash
kubeadm config print init-defaults > kubeadm-config.yaml
kubeadm init --config=/root/kubeadm-config.yaml --upload-certs
```

### 在 master-2 master-3 节点上执行

```bash
kubeadm join 172.25.8.250:6443 --token <token> --discovery-token-ca-cert-hash <discovery-token>  --control-plane --certificate-key <key>24edee639538bfda723e8dd3b8860ea679c36def8564822f045733e7df4698
```

### 在 worker 节点上执行

```bash
kubeadm join 172.25.8.250:6443 --token <token> --discovery-token-ca-cert-hash <discovery-token>
```

### 检查集群

```bash
root@master-1:~# kubectl get node -o wide
NAME       STATUS   ROLES           AGE     VERSION    INTERNAL-IP   EXTERNAL-IP   OS-IMAGE           KERNEL-VERSION      CONTAINER-RUNTIME
master-1   Ready    control-plane   5h59m   v1.28.15   172.25.8.199    <none>        Ubuntu 22.04 LTS   5.15.0-72-generic   containerd://1.7.27
master-2   Ready    control-plane   5h58m   v1.28.15   172.25.8.224    <none>        Ubuntu 22.04 LTS   5.15.0-72-generic   containerd://1.7.27
master-3   Ready    control-plane   5h30m   v1.28.15   172.25.8.207    <none>        Ubuntu 22.04 LTS   5.15.0-72-generic   containerd://1.7.27
worker-1   Ready    <none>          5h9m    v1.28.15   172.25.8.248    <none>        Ubuntu 22.04 LTS   5.15.0-72-generic   containerd://1.7.27
worker-2   Ready    <none>          5h      v1.28.15   172.25.8.225    <none>        Ubuntu 22.04 LTS   5.15.0-72-generic   containerd://1.7.27
worker-3   Ready    <none>          4h55m   v1.28.15   172.25.8.246    <none>        Ubuntu 22.04 LTS   5.15.0-72-generic   containerd://1.7.27
```
