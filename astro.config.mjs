import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

const LIVE_URL = 'http://mafifa.github.io/'

// https://astro.build/config
export default defineConfig({
  site: LIVE_URL,
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  }
})
