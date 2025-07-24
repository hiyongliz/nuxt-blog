import { describe, expect, it } from 'vitest'
import { formatDate, getPostReadingTime, getReadingTime } from '~/utils/blogHelpers'

describe('blogHelpers', () => {
  describe('formatDate', () => {
    it('should format a date correctly', () => {
      const date = new Date('2023-01-15')
      const result = formatDate(date)
      expect(result).toBe('2023/01/15')
    })

    it('should handle string dates', () => {
      const dateString = '2023-01-15'
      const result = formatDate(dateString)
      expect(result).toBe('2023/01/15')
    })
  })

  describe('getReadingTime', () => {
    it('should calculate reading time for short content', () => {
      const content = 'This is a short text.'
      const result = getReadingTime(content)
      expect(result).toBe('1 min read')
    })

    it('should calculate reading time for longer content', () => {
      const content = 'word '.repeat(500) // 500 words
      const result = getReadingTime(content)
      expect(result).toBe('3 min read')
    })

    it('should remove HTML tags when calculating reading time', () => {
      const content = '<p>This is a <strong>short</strong> text with <em>HTML</em> tags.</p>'
      const result = getReadingTime(content)
      expect(result).toBe('1 min read')
    })
  })

  describe('getPostReadingTime', () => {
    it('should use duration from meta if available', () => {
      const post = {
        meta: {
          duration: '5 min read',
        },
        body: 'This is some content.',
      }

      const result = getPostReadingTime(post)
      expect(result).toBe('5 min read')
    })

    it('should calculate reading time from body content if no duration in meta', () => {
      const post = {
        body: 'word '.repeat(300), // 300 words
        meta: {},
      }

      const result = getPostReadingTime(post)
      expect(result).toBe('2 min read')
    })

    it('should return empty string if no duration or body', () => {
      const post = {
        meta: {},
      }

      const result = getPostReadingTime(post)
      expect(result).toBe('')
    })
  })
})
