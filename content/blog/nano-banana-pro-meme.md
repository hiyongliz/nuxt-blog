---
title: Nano Banana Pro 制作表情包
date: 2025-11-24 17:40:00
description: Nano Banana Pro 制作表情包提示词
tags: [prompt, llm, nano banana pro]
---

今天在[L站](https://linux.do/t/topic/1209913/81)上发现有人分享一个 Nano Banana Pro 制作表情包的提示词，我也来试了一下，效果还不错。

### 提示词

```
为我生成图中角色的绘制 Q 版的，LINE 风格的半身像表情包，注意头饰要正确
彩色手绘风格，使用 4x6 布局，涵盖各种各样的常用聊天语句，或是一些有关的娱乐 meme
其他需求：不要原图复制。所有标注为手写简体中文。
生成的图片需为 4K 分辨率 16:9
```

### 效果如下

![image.png](/images/nano-banana-pro-meme-0.png)

生成图

![image.png](/images/nano-banana-pro-meme-1.png)

### 切割图片

因为我是要发布到微信表情包平台的，因此我用 gemini 3 pro 做了一个简易的[在线工具](https://split-grid.lazylazylazy.online)，用来把生成的图片切割成单个表情。
