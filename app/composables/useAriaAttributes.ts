/**
 * Composable for managing ARIA attributes and accessibility properties
 */

export function useAriaAttributes() {
  /**
   * Generate ARIA label for navigation elements
   * @param currentPage - Current page title
   * @param totalPages - Total number of pages (if applicable)
   * @returns Appropriate ARIA label
   */
  const getNavigationLabel = (currentPage?: string, totalPages?: number): string => {
    if (currentPage && totalPages) {
      return `Page ${currentPage} of ${totalPages}`
    } else if (currentPage) {
      return `Current page: ${currentPage}`
    }
    return 'Main navigation'
  }

  /**
   * Generate ARIA label for image elements
   * @param altText - The alt text of the image
   * @param isDecorative - Whether the image is decorative
   * @returns Appropriate ARIA label
   */
  const getImageLabel = (altText: string, isDecorative: boolean = false): string => {
    if (isDecorative) {
      return 'Decorative image'
    }
    return altText || 'Image'
  }

  /**
   * Generate ARIA label for interactive elements
   * @param action - The action the element performs
   * @param state - Current state of the element (if applicable)
   * @returns Appropriate ARIA label
   */
  const getActionLabel = (action: string, state?: string): string => {
    if (state) {
      return `${action} - ${state}`
    }
    return action
  }

  /**
   * Toggle ARIA expanded state for collapsible elements
   * @param element - The element to toggle
   * @returns New expanded state
   */
  const toggleExpanded = (element: HTMLElement): boolean => {
    const isExpanded = element.getAttribute('aria-expanded') === 'true'
    const newState = !isExpanded
    element.setAttribute('aria-expanded', String(newState))
    return newState
  }

  /**
   * Set ARIA busy state for loading content
   * @param element - The element to update
   * @param isBusy - Whether the element is busy/loading
   */
  const setBusyState = (element: HTMLElement, isBusy: boolean): void => {
    element.setAttribute('aria-busy', String(isBusy))
    if (isBusy) {
      element.setAttribute('aria-live', 'polite')
    } else {
      element.removeAttribute('aria-live')
    }
  }

  /**
   * Generate ARIA description for form elements
   * @param description - Description text
   * @param error - Error message (if applicable)
   * @returns Appropriate ARIA description
   */
  const getFormDescription = (description?: string, error?: string): string => {
    if (error) {
      return `Error: ${error}`
    }
    return description || ''
  }

  return {
    getNavigationLabel,
    getImageLabel,
    getActionLabel,
    toggleExpanded,
    setBusyState,
    getFormDescription
  }
}