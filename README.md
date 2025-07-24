# Lazy's Webblog

This is a personal blog built with Nuxt 3, featuring a clean and modern design with dark mode support.

## Features

- 📝 Markdown-based content management
- 🌗 Dark/light mode with automatic detection
- 🎨 UnoCSS for styling with a utility-first approach
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🔍 SEO optimized
- 🧠 Built with TypeScript and Vue 3

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Intuitive Web Framework
- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [UnoCSS](https://unocss.dev/) - The instant on-demand atomic CSS engine
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Pinia](https://pinia.vuejs.org/) - The intuitive store for Vue

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm run dev
```

3. Build for production:

```bash
pnpm run build
```

4. Preview the production build:

```bash
pnpm run preview
```

## Project Structure

```
├── app/                # Application source code
│   ├── assets/         # CSS and other assets
│   ├── components/     # Vue components
│   ├── composables/    # Vue composables
│   ├── constants/      # Application constants
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   ├── app.vue         # App root component
│   └── error.vue       # Error page
├── content/            # Markdown content
│   └── blog/           # Blog posts
├── public/             # Static assets
└── nuxt.config.ts      # Nuxt configuration
```

## Content Management

Blog posts are written in Markdown and stored in the `content/blog/` directory. Each post should have a frontmatter section with metadata like title, date, and description.

Example post structure:

```markdown
---
title: My Blog Post
date: 2023-05-01
description: A brief description of the post
---

# My Blog Post

Content of the blog post in Markdown format...
```

## Deployment

This blog can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

For a simple deployment to Vercel:

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Deploy!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
