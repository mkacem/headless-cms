import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'page/*.md'
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md'
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md'
    }),
    blog_en: defineCollection({
      type: 'page',
      source: 'en/blog/*.md'
    }),
    blog_fr: defineCollection({
      type: 'page', 
      source: 'fr/blog/*.md'
    })
  }
})
