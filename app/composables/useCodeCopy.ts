/**
 * 代码复制功能的组合式函数
 * 自动为页面中的代码块添加复制按钮
 */

export function useCodeCopy() {
  const isClient = import.meta.client

  /**
   * 为代码块添加复制按钮
   */
  function addCopyButtons() {
    if (!isClient) return

    // 查找所有的 pre 元素
    const preElements = document.querySelectorAll('.prose pre')
    
    preElements.forEach((pre) => {
      // 检查是否已经添加了复制按钮
      if (pre.querySelector('.copy-button-wrapper')) return
      
      // 获取代码内容
      const codeElement = pre.querySelector('code')
      if (!codeElement) return
      
      const codeText = codeElement.textContent || ''
      
      // 为 pre 元素添加相对定位和 group 类
      pre.classList.add('relative', 'group')
      
      // 创建复制按钮容器
      const buttonWrapper = document.createElement('div')
      buttonWrapper.className = 'copy-button-wrapper absolute inset-0 pointer-events-none'
      buttonWrapper.style.cssText = 'position: absolute; top: 0; right: 0; width: 0; height: 0; pointer-events: none;'
      buttonWrapper.innerHTML = `
        <button 
          class="copy-button absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style="pointer-events: auto;"
          aria-label="复制代码"
        >
          <svg class="copy-icon h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
      `
      
      // 添加点击事件
      const button = buttonWrapper.querySelector('.copy-button') as HTMLButtonElement
      
      let isProcessing = false
      
      button.addEventListener('click', async () => {
        if (isProcessing) return
        isProcessing = true
        
        try {
          await navigator.clipboard.writeText(codeText)
          
          // 更新按钮状态
          button.classList.add('bg-green-100', 'dark:bg-green-900', 'text-green-700', 'dark:text-green-300', 'border-green-300', 'dark:border-green-700')
          button.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-600')
          
          // 2秒后重置状态
          setTimeout(() => {
            button.classList.remove('bg-green-100', 'dark:bg-green-900', 'text-green-700', 'dark:text-green-300', 'border-green-300', 'dark:border-green-700')
            button.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-600')
            isProcessing = false
          }, 2000)
          
        } catch (err) {
          console.error('Failed to copy code:', err)
          // 降级方案
          try {
            const textArea = document.createElement('textarea')
            textArea.value = codeText
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            
            // 显示成功状态
            button.classList.add('bg-green-100', 'dark:bg-green-900', 'text-green-700', 'dark:text-green-300', 'border-green-300', 'dark:border-green-700')
            button.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-600')
            
            setTimeout(() => {
              button.classList.remove('bg-green-100', 'dark:bg-green-900', 'text-green-700', 'dark:text-green-300', 'border-green-300', 'dark:border-green-700')
              button.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-600', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-600')
              isProcessing = false
            }, 2000)
          } catch (fallbackErr) {
            console.error('Fallback copy also failed:', fallbackErr)
            isProcessing = false
          }
        }
      })
      
      // 将按钮添加到 pre 元素中
      pre.appendChild(buttonWrapper)
    })
  }

  /**
   * 初始化代码复制功能
   */
  function initCodeCopy() {
    if (!isClient) return

    // 页面加载完成后添加复制按钮
    nextTick(() => {
      addCopyButtons()
    })

    // 监听内容变化（如果有动态加载的内容）
    const observer = new MutationObserver(() => {
      addCopyButtons()
    })

    // 观察文档变化
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // 清理函数
    onUnmounted(() => {
      observer.disconnect()
    })
  }

  return {
    addCopyButtons,
    initCodeCopy
  }
}