import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
const LIVE_URL = 'http://mafifa.github.io/';


// https://astro.build/config
export default defineConfig({
  source: '/src',
  site: LIVE_URL,
  integrations: [tailwind(), react()],
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});