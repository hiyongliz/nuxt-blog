/**
 * Composable for handling accessible images
 */

export function useAccessibleImage() {
  /**
   * Generate accessible alt text for an image
   * @param title - The title or subject of the image
   * @param caption - An optional caption describing the image
   * @param isDecorative - Whether the image is purely decorative
   * @returns Appropriate alt text for the image
   */
  const generateAltText = (
    title: string,
    caption?: string,
    isDecorative: boolean = false
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
    generateAltText
  }
}