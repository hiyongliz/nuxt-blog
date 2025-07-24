/**
 * 图片优化 composable
 * 提供图片懒加载、格式优化等功能
 */

export interface ImageOptions {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  loading?: 'lazy' | 'eager'
  sizes?: string
}

export function useImageOptimization() {
  /**
   * 生成优化的图片 URL
   */
  function getOptimizedImageUrl(src: string, options: Partial<ImageOptions> = {}) {
    // 如果是外部图片，直接返回
    if (src.startsWith('http')) {
      return src
    }

    const params = new URLSearchParams()
    
    if (options.width) params.set('w', options.width.toString())
    if (options.height) params.set('h', options.height.toString())
    if (options.quality) params.set('q', options.quality.toString())
    if (options.format) params.set('f', options.format)

    const queryString = params.toString()
    return queryString ? `${src}?${queryString}` : src
  }

  /**
   * 生成响应式图片的 srcset
   */
  function generateSrcSet(src: string, widths: number[] = [320, 640, 768, 1024, 1280]) {
    return widths
      .map(width => `${getOptimizedImageUrl(src, { width })} ${width}w`)
      .join(', ')
  }

  /**
   * 检测浏览器支持的图片格式
   */
  function getSupportedFormat(): 'avif' | 'webp' | 'jpg' {
    if (process.client) {
      // 检测 AVIF 支持
      const avifCanvas = document.createElement('canvas')
      avifCanvas.width = 1
      avifCanvas.height = 1
      if (avifCanvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
        return 'avif'
      }

      // 检测 WebP 支持
      const webpCanvas = document.createElement('canvas')
      webpCanvas.width = 1
      webpCanvas.height = 1
      if (webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
        return 'webp'
      }
    }

    return 'jpg'
  }

  /**
   * 图片懒加载观察器
   */
  function createLazyLoadObserver(callback: (entry: IntersectionObserverEntry) => void) {
    if (!process.client) return null

    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry)
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      },
    )
  }

  /**
   * 预加载关键图片
   */
  function preloadImage(src: string, options: Partial<ImageOptions> = {}) {
    if (!process.client) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = getOptimizedImageUrl(src, options)
    
    if (options.sizes) {
      link.setAttribute('imagesizes', options.sizes)
    }

    document.head.appendChild(link)
  }

  return {
    getOptimizedImageUrl,
    generateSrcSet,
    getSupportedFormat,
    createLazyLoadObserver,
    preloadImage,
  }
}
