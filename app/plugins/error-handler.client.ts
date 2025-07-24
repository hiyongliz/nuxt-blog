/**
 * 客户端错误处理插件
 * 捕获和记录客户端错误
 */

export default defineNuxtPlugin(() => {
  // 捕获 Vue 错误
  const nuxtApp = useNuxtApp()
  
  nuxtApp.hook('vue:error', (error, context) => {
    console.error('Vue Error:', error, context)
    
    // 在生产环境中发送错误到监控服务
    if (process.env.NODE_ENV === 'production') {
      // 这里可以集成 Sentry、LogRocket 等错误监控服务
      // sendErrorToMonitoring(error, context)
    }
  })

  // 捕获未处理的 Promise 拒绝
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason)
      
      if (process.env.NODE_ENV === 'production') {
        // sendErrorToMonitoring(event.reason, 'unhandledrejection')
      }
    })

    // 捕获全局 JavaScript 错误
    window.addEventListener('error', (event) => {
      console.error('Global Error:', event.error)
      
      if (process.env.NODE_ENV === 'production') {
        // sendErrorToMonitoring(event.error, 'global')
      }
    })
  }
})

// 错误发送函数示例
// function sendErrorToMonitoring(error: any, context: string) {
//   // 实现错误发送逻辑
//   fetch('/api/errors', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       error: error.toString(),
//       stack: error.stack,
//       context,
//       url: window.location.href,
//       userAgent: navigator.userAgent,
//       timestamp: new Date().toISOString(),
//     }),
//   }).catch(() => {
//     // 静默处理发送失败
//   })
// }
