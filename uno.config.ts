import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // 简单的链接样式
    ['link', 'text-blue-500 hover:text-blue-800 underline decoration-1 underline-offset-2'],
    ['link-subtle', 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 no-underline hover:underline'],
    ['link-accent', 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border-b border-dotted border-current hover:border-solid transition-colors duration-200'],

    // 简单的按钮样式
    ['btn', 'px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200'],
    ['btn-primary', 'px-4 py-2 text-sm bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700 transition-colors duration-200'],
    ['btn-secondary', 'px-4 py-2 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-200'],
    ['btn-accent', 'px-4 py-2 text-sm bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 transition-colors duration-200'],

    // 简单的容器
    ['container', 'max-w-4xl mx-auto px-4'],
    ['content-width', 'max-w-none'],
    ['container-narrow', 'max-w-2xl mx-auto px-4'],

    // 文本样式
    ['text-muted', 'text-gray-600 dark:text-gray-400'],
    ['text-subtle', 'text-gray-500 dark:text-gray-500'],
    ['text-body', 'text-gray-900 dark:text-gray-100'],

    // 卡片样式（已移除）
    // ['card', 'border border-gray-200 rounded-lg p-6 shadow-sm transition-shadow duration-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg'],
    // ['card-hover', 'border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-300 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1'],

    // 简单的分割线
    ['divider', 'border-t border-gray-200 dark:border-gray-700'],
    
    // 响应式工具类
    ['responsive-grid', 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'],
    ['center-flex', 'flex items-center justify-center'],
    ['center-grid', 'grid place-items-center'],
  ],

  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography({
      cssExtend: {
        'code': {
          'color': '#e11d48',
          'background-color': '#f1f5f9',
          'padding': '0.125rem 0.25rem',
          'border-radius': '0.25rem',
          'font-size': '0.875em',
        },
        'code::before': {
          content: '""',
        },
        'code::after': {
          content: '""',
        },
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        serif: 'Playfair Display:400,500,600,700',
        mono: 'Fira Code:400,500,600',
      },
      processors: createLocalFontProcessor(),
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  safelist: [
    'i-carbon-sun',
    'i-carbon-moon',
    'i-carbon-logo-github',
    'i-carbon-subtract-large',
  ],
})
