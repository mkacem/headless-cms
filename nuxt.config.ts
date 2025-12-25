// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui', 
    '@nuxtjs/i18n'
  ],
   content: {
    // This is the primary way to disable anchor links globally in recent versions
    renderer: {
      anchorLinks: false
    },
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', dir: 'ltr' },
      { code: 'fr', name: 'French', language: 'fr-FR' },
      // { code: 'ar', name: 'Arabic', language: 'ar-AR', dir: 'rtl' },
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
  },
  experimental: {
    payloadExtraction: false,
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})