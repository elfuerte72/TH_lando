import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import unwrapLayer from './postcss-unwrap-layer.mjs';
import compat from './postcss-compat.mjs';

export default {
  plugins: [
    tailwindcss(),
    unwrapLayer(),
    compat(),
    autoprefixer(),
  ],
};
