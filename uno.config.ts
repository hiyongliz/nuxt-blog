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

    // 简单的按钮样式
    ['btn', 'px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'],
    ['btn-primary', 'px-3 py-1 text-sm bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700 transition-colors'],

    // 简单的容器
    ['container', 'max-w-4xl mx-auto px-4'],
    ['content-width', 'max-w-none'],

    // 文本样式
    ['text-muted', 'text-gray-600 dark:text-gray-400'],
    ['text-body', 'text-gray-900 dark:text-gray-100'],

    // 简单的分割线
    ['divider', 'border-t border-gray-200 dark:border-gray-700'],
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
        sans: 'DM Sans:400,500,600,700',
        serif: 'DM Serif Display:400,500,600,700',
        mono: 'DM Mono:400,500,600',
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
