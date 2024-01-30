import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from "@astrojs/node";
import netlify from "@astrojs/netlify/functions";
import sitemap from "@astrojs/sitemap";

//https://docs.astro.build/en/guides/integrations-guide/sitemap/


// https://astro.build/config
export default defineConfig({
  site: 'https://preeminent-mochi-ac18b5.netlify.app/',
  integrations: [tailwind(), sitemap()],
  output: "server",
  adapter: netlify()
});