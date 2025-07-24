/**
 * 搜索功能 composable
 * 提供全文搜索、标签搜索等功能
 */

export interface SearchResult {
  id: string
  title: string
  description?: string
  content: string
  tags?: string[]
  date: string
  path: string
  score: number
}

export interface SearchOptions {
  query: string
  tags?: string[]
  limit?: number
  includeContent?: boolean
}

export function useSearch() {
  const searchResults = ref<SearchResult[]>([])
  const isSearching = ref(false)
  const searchQuery = ref('')

  /**
   * 计算文本相似度分数
   */
  function calculateScore(text: string, query: string): number {
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    
    // 完全匹配得分最高
    if (lowerText.includes(lowerQuery)) {
      const position = lowerText.indexOf(lowerQuery)
      // 越靠前得分越高
      return 100 - (position / lowerText.length) * 50
    }
    
    // 单词匹配
    const queryWords = lowerQuery.split(/\s+/)
    const textWords = lowerText.split(/\s+/)
    
    let matchCount = 0
    queryWords.forEach(queryWord => {
      if (textWords.some(textWord => textWord.includes(queryWord))) {
        matchCount++
      }
    })
    
    return (matchCount / queryWords.length) * 50
  }

  /**
   * 搜索文章
   */
  async function searchPosts(options: SearchOptions): Promise<SearchResult[]> {
    if (!options.query.trim()) {
      return []
    }

    isSearching.value = true
    
    try {
      // 获取所有文章
      const allPosts = await queryCollection('blog').all()
      
      const results: SearchResult[] = []
      
      allPosts.forEach((post) => {
        let totalScore = 0
        
        // 标题匹配（权重最高）
        const titleScore = calculateScore(post.title || '', options.query) * 3
        totalScore += titleScore
        
        // 描述匹配
        if (post.description) {
          const descScore = calculateScore(post.description, options.query) * 2
          totalScore += descScore
        }
        
        // 内容匹配
        if (options.includeContent && post.body) {
          const bodyText = typeof post.body === 'string' 
            ? post.body 
            : JSON.stringify(post.body)
          const contentScore = calculateScore(bodyText, options.query)
          totalScore += contentScore
        }
        
        // 标签匹配
        if (post.tags && Array.isArray(post.tags)) {
          const tagScore = post.tags.reduce((score, tag) => {
            return score + calculateScore(tag, options.query) * 1.5
          }, 0)
          totalScore += tagScore
        }
        
        // 标签筛选
        if (options.tags && options.tags.length > 0) {
          const hasMatchingTag = options.tags.some(filterTag => 
            post.tags?.includes(filterTag)
          )
          if (!hasMatchingTag) {
            totalScore = 0
          }
        }
        
        // 只包含有分数的结果
        if (totalScore > 0) {
          results.push({
            id: post.id || '',
            title: post.title || '',
            description: post.description,
            content: typeof post.body === 'string' ? post.body : '',
            tags: post.tags,
            date: post.date || '',
            path: post.path || '',
            score: totalScore,
          })
        }
      })
      
      // 按分数排序并限制结果数量
      return results
        .sort((a, b) => b.score - a.score)
        .slice(0, options.limit || 10)
        
    } finally {
      isSearching.value = false
    }
  }

  /**
   * 高亮搜索关键词
   */
  function highlightText(text: string, query: string): string {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }

  /**
   * 获取搜索建议
   */
  async function getSearchSuggestions(query: string): Promise<string[]> {
    if (!query.trim()) return []
    
    const allPosts = await queryCollection('blog').all()
    const suggestions = new Set<string>()
    
    allPosts.forEach((post) => {
      // 从标题中提取建议
      if (post.title) {
        const words = post.title.toLowerCase().split(/\s+/)
        words.forEach(word => {
          if (word.includes(query.toLowerCase()) && word.length > 2) {
            suggestions.add(word)
          }
        })
      }
      
      // 从标签中提取建议
      if (post.tags) {
        post.tags.forEach(tag => {
          if (tag.toLowerCase().includes(query.toLowerCase())) {
            suggestions.add(tag)
          }
        })
      }
    })
    
    return Array.from(suggestions).slice(0, 5)
  }

  return {
    searchResults: readonly(searchResults),
    isSearching: readonly(isSearching),
    searchQuery,
    searchPosts,
    highlightText,
    getSearchSuggestions,
  }
}
