import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss() as any],
    build: {
      cssTarget: ['chrome80', 'safari13', 'firefox80'],
    },
    server: {
      allowedHosts: true,
    },
  },
});
