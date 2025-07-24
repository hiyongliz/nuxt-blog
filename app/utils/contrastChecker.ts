/**
 * Utility functions for checking color contrast ratios
 */

/**
 * Calculate the relative luminance of a color
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Relative luminance value
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [R, G, B] = [r, g, b].map(component => {
    const sRGB = component / 255
    return sRGB <= 0.03928 
      ? sRGB / 12.92 
      : Math.pow((sRGB + 0.055) / 1.055, 2.4)
  })
  
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/**
 * Calculate the contrast ratio between two colors
 * @param luminance1 - Luminance of first color
 * @param luminance2 - Luminance of second color
 * @returns Contrast ratio
 */
function getContrastRatio(luminance1: number, luminance2: number): number {
  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Parse a hex color string to RGB components
 * @param hex - Hex color string (#RRGGBB or #RGB)
 * @returns Object with r, g, b properties
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result 
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

/**
 * Check if a color contrast ratio meets WCAG requirements
 * @param ratio - Contrast ratio
 * @param level - WCAG level (AA or AAA)
 * @param fontSize - Font size in points (optional, for text size considerations)
 * @returns Whether the contrast meets requirements
 */
function meetsWCAG(ratio: number, level: 'AA' | 'AAA' = 'AA', fontSize?: number): boolean {
  // For large text (18pt+ or 14pt+ bold), requirements are less strict
  const isLargeText = fontSize && (fontSize >= 18 || fontSize >= 14) // Simplified check
  
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  } else {
    return isLargeText ? ratio >= 3 : ratio >= 4.5
  }
}

/**
 * Check contrast ratio between two hex colors
 * @param hex1 - First hex color
 * @param hex2 - Second hex color
 * @param level - WCAG level to check against
 * @param fontSize - Font size in points (optional)
 * @returns Object with ratio and whether it meets requirements
 */
export function checkContrast(
  hex1: string, 
  hex2: string, 
  level: 'AA' | 'AAA' = 'AA',
  fontSize?: number
): { ratio: number; meets: boolean; } {
  const color1 = hexToRgb(hex1)
  const color2 = hexToRgb(hex2)
  
  if (!color1 || !color2) {
    throw new Error('Invalid hex color values')
  }
  
  const luminance1 = getRelativeLuminance(color1.r, color1.g, color1.b)
  const luminance2 = getRelativeLuminance(color2.r, color2.g, color2.b)
  const ratio = getContrastRatio(luminance1, luminance2)
  
  return {
    ratio: parseFloat(ratio.toFixed(2)),
    meets: meetsWCAG(ratio, level, fontSize)
  }
}

/**
 * Get CSS variable value from root
 * @param variableName - CSS variable name (without -- prefix)
 * @returns Variable value or null
 */
export function getCssVariable(variableName: string): string | null {
  if (typeof document === 'undefined') return null
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${variableName}`)
    .trim()
}

/**
 * Check contrast for CSS variables used in the application
 * @returns Object with contrast check results
 */
export function checkAppContrast(): Record<string, { ratio: number; meets: boolean }> {
  // These are the main color variables from the app
  const lightModeColors = {
    fg: '#374151',
    bg: '#ffffff'
  }
  
  const darkModeColors = {
    fg: '#d1d5db',
    bg: '#111827'
  }
  
  const results: Record<string, { ratio: number; meets: boolean }> = {}
  
  // Check light mode contrast
  try {
    const lightContrast = checkContrast(lightModeColors.fg, lightModeColors.bg)
    results['light-mode'] = lightContrast
  } catch (e) {
    results['light-mode'] = { ratio: 0, meets: false }
  }
  
  // Check dark mode contrast
  try {
    const darkContrast = checkContrast(darkModeColors.fg, darkModeColors.bg)
    results['dark-mode'] = darkContrast
  } catch (e) {
    results['dark-mode'] = { ratio: 0, meets: false }
  }
  
  return results
}