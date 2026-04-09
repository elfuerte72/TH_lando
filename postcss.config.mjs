import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import unwrapLayer from './postcss-unwrap-layer.mjs';

export default {
  plugins: [
    tailwindcss(),
    unwrapLayer(),
    autoprefixer(),
  ],
};
