/**
 * 动态生成 sitemap.xml
 */

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://yourdomain.com' // 替换为实际域名
  
  // 获取所有博客文章
  const posts = await queryCollection('blog').all()
  
  // 静态页面
  const staticPages = [
    { url: '/', lastmod: new Date().toISOString(), priority: '1.0' },
    { url: '/about', lastmod: new Date().toISOString(), priority: '0.8' },
    { url: '/tags', lastmod: new Date().toISOString(), priority: '0.8' },
  ]
  
  // 博客文章页面
  const blogPages = posts.map(post => ({
    url: post.path,
    lastmod: post.lastModified || post.date,
    priority: '0.9',
  }))
  
  // 标签页面
  const allTags = new Set<string>()
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => allTags.add(tag))
    }
  })
  
  const tagPages = Array.from(allTags).map(tag => ({
    url: `/tags/${encodeURIComponent(tag)}`,
    lastmod: new Date().toISOString(),
    priority: '0.7',
  }))
  
  const allPages = [...staticPages, ...blogPages, ...tagPages]
  
  // 生成 XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // 设置响应头
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600') // 缓存1小时
  
  return sitemap
})
