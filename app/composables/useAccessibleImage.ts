/**
 * Composable for handling accessible images
 * Provides utilities for generating accessible alt text for images
 * @see https://www.w3.org/WAI/tutorials/images/
 */

export function useAccessibleImage() {
  /**
   * Generate accessible alt text for an image based on WCAG guidelines
   * @param title - The title or subject of the image
   * @param caption - An optional caption describing the image (takes precedence over title)
   * @param isDecorative - Whether the image is purely decorative (if true, returns empty string)
   * @returns Appropriate alt text for the image or empty string for decorative images
   * @see https://www.w3.org/WAI/WCAG21/quickref/#non-text-content
   * @example
   * generateAltText('Sunset over mountains') // 'Sunset over mountains'
   * generateAltText('Chart', 'Sales increased 25% in Q2', false) // 'Sales increased 25% in Q2'
   * generateAltText('Background pattern', undefined, true) // ''
   */
  const generateAltText = (
    title: string,
    caption?: string,
    isDecorative: boolean = false,
  ): string => {
    // If the image is decorative, return empty alt text
    if (isDecorative) {
      return ''
    }

    // If there's a caption, use it as it's likely more descriptive
    if (caption) {
      return caption
    }

    // Fallback to title
    return title || ''
  }

  return {
    generateAltText,
  }
}

