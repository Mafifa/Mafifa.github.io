import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import astroI18next from 'astro-i18next'

const LIVE_URL = 'http://mafifa.github.io/'

// https://astro.build/config
export default defineConfig({
  site: LIVE_URL,
  integrations: [tailwind(), astroI18next()]
})
