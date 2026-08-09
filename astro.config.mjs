import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://anuragraut.dev',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
