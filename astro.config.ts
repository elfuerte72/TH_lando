import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    build: {
      cssTarget: ['chrome80', 'safari13', 'firefox80'],
    },
    server: {
      allowedHosts: true,
    },
  },
});
