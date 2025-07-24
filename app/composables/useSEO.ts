/**
 * SEO 优化 composable
 * 提供统一的 SEO 设置和结构化数据生成
 */

export interface SEOData {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}

export function useSEO() {
  const route = useRoute()
  const { appName } = useAppConfig()

  /**
   * 生成完整的 SEO meta 标签
   */
  function generateSEOMeta(data: SEOData) {
    const fullTitle = data.title === appName ? data.title : `${data.title} | ${appName}`
    const currentUrl = `https://yourdomain.com${route.path}`

    return {
      title: fullTitle,
      meta: [
        { name: 'description', content: data.description },
        { name: 'keywords', content: data.tags?.join(', ') || '' },
        
        // Open Graph
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: data.description },
        { property: 'og:type', content: data.type || 'website' },
        { property: 'og:url', content: data.url || currentUrl },
        { property: 'og:site_name', content: appName },
        ...(data.image ? [{ property: 'og:image', content: data.image }] : []),
        
        // Twitter Card
        { name: 'twitter:card', content: data.image ? 'summary_large_image' : 'summary' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: data.description },
        ...(data.image ? [{ name: 'twitter:image', content: data.image }] : []),
        
        // Article specific
        ...(data.type === 'article' && data.publishedTime ? [
          { property: 'article:published_time', content: data.publishedTime },
        ] : []),
        ...(data.type === 'article' && data.modifiedTime ? [
          { property: 'article:modified_time', content: data.modifiedTime },
        ] : []),
        ...(data.author ? [{ property: 'article:author', content: data.author }] : []),
      ],
      link: [
        { rel: 'canonical', href: data.url || currentUrl },
      ],
    }
  }

  /**
   * 生成 JSON-LD 结构化数据
   */
  function generateJSONLD(data: SEOData) {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': data.type === 'article' ? 'BlogPosting' : 'WebSite',
      name: data.title,
      description: data.description,
      url: data.url || `https://yourdomain.com${route.path}`,
    }

    if (data.type === 'article') {
      return {
        ...baseSchema,
        '@type': 'BlogPosting',
        headline: data.title,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        author: {
          '@type': 'Person',
          name: data.author || 'Lazy',
        },
        publisher: {
          '@type': 'Organization',
          name: appName,
        },
        ...(data.image ? {
          image: {
            '@type': 'ImageObject',
            url: data.image,
          },
        } : {}),
        ...(data.tags ? { keywords: data.tags } : {}),
      }
    }

    return baseSchema
  }

  return {
    generateSEOMeta,
    generateJSONLD,
  }
}
