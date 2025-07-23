<script setup lang="ts">
import { useColorMode } from '#imports'
import { onMounted, ref, watch } from 'vue'

// Giscus 配置属性
interface Props {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number' | 'slug'
  term?: string
  strict?: '0' | '1'
  reactionsEnabled?: '0' | '1'
  emitMetadata?: '0' | '1'
  inputPosition?: 'top' | 'bottom'
  lang?: string
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'zh-CN',
  loading: 'lazy',
})

// 获取颜色模式
const colorMode = useColorMode()
const giscusEl = ref<HTMLElement | null>(null)

// 动态加载 Giscus 脚本
const loadGiscus = () => {
  if (!giscusEl.value) return
  
  // 清空容器
  giscusEl.value.innerHTML = ''
  
  // 创建脚本元素
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', props.repo)
  script.setAttribute('data-repo-id', props.repoId)
  script.setAttribute('data-category', props.category)
  script.setAttribute('data-category-id', props.categoryId)
  script.setAttribute('data-mapping', props.mapping)
  if (props.term) script.setAttribute('data-term', props.term)
  script.setAttribute('data-theme', colorMode.value === 'dark' ? 'dark' : 'light')
  script.setAttribute('data-strict', props.strict)
  script.setAttribute('data-reactions-enabled', props.reactionsEnabled)
  script.setAttribute('data-emit-metadata', props.emitMetadata)
  script.setAttribute('data-input-position', props.inputPosition)
  script.setAttribute('data-lang', props.lang)
  script.setAttribute('data-loading', props.loading)
  
  // 添加到容器
  giscusEl.value.appendChild(script)
}

// 监听颜色模式变化并更新 Giscus 主题
watch(
  () => colorMode.value,
  (newMode) => {
    // 向父窗口发送消息以更新 Giscus 主题
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: newMode === 'dark' ? 'dark' : 'light' } } },
        'https://giscus.app',
      )
    } else {
      // 如果 iframe 不存在，重新加载 Giscus
      loadGiscus()
    }
  },
)

// 组件挂载时加载 Giscus
onMounted(() => {
  loadGiscus()
})
</script>

<template>
  <div class="giscus-wrapper">
    <div ref="giscusEl" class="giscus-container"></div>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
}
</style>