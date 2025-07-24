/**
 * Composable for managing focus and keyboard navigation
 */

export function useFocusManagement() {
  /**
   * Focus an element by selector
   * @param selector - CSS selector for the element to focus
   * @param container - Optional container element to search within
   */
  const focusElement = (selector: string, container: HTMLElement | Document = document) => {
    const element = container.querySelector(selector) as HTMLElement | null
    if (element) {
      element.focus()
    }
  }

  /**
   * Trap focus within a container element
   * @param container - The container element to trap focus within
   * @returns A function to remove the focus trap
   */
  const trapFocus = (container: HTMLElement): (() => void) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus()
            e.preventDefault()
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus()
            e.preventDefault()
          }
        }
      }
    }
    
    container.addEventListener('keydown', handleKeydown)
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeydown)
    }
  }

  /**
   * Skip to main content
   * @param mainContentId - The ID of the main content element
   */
  const skipToContent = (mainContentId: string = 'main-content') => {
    const mainContent = document.getElementById(mainContentId)
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }

  return {
    focusElement,
    trapFocus,
    skipToContent
  }
}