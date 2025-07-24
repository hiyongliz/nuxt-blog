/**
 * Utility functions for blog post formatting and calculations
 */

/**
 * Format a date for display
 * @param date - Date string or Date object
 * @returns Formatted date string in YYYY/MM/DD format
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

/**
 * Calculate reading time for content
 * @param content - Content string to calculate reading time for
 * @returns Reading time string
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const textContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
  const wordCount = textContent.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readingTime} min read`
}

/**
 * Get reading time for a blog post
 * @param post - Blog post object
 * @returns Reading time string or empty string
 */
export function getPostReadingTime(post: any): string {
  // Prefer duration field from frontmatter
  if (post.meta?.duration) {
    return post.meta.duration
  }

  // Calculate reading time based on post content
  if (post.body) {
    // Ensure body is string type
    const bodyContent = typeof post.body === 'string' ? post.body : JSON.stringify(post.body)
    return getReadingTime(bodyContent)
  }

  // Return default value if no duration
  return ''
}
