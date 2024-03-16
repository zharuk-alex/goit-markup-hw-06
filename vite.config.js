import { defineConfig } from 'vite';
import * as glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import imageOptimizerConfig from './vite-plugin-image-optimizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ command }) => {
  return {
    base: './',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    filenameHashing: false,
    build: {
      emptyOutDir: true,
      cssCodeSplit: true,
      minify: false,
      sourcemap: false,
      outDir: '../dist',
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name][extname]';
            }

            if (
              assetInfo.name.endsWith('.jpg') ||
              assetInfo.name.endsWith('.png')
            ) {
              const folder = assetInfo.name?.split('_')?.[0];
              if (folder?.length) {
                return `images/${folder}/[name][extname]`;
              }
            }

            if (assetInfo.name == 'icons.svg') {
              return 'images/[name][extname]';
            }

            return 'assets/[name][extname]';
          },
        },
      },
    },

    plugins: [
      injectHTML(),
      ViteImageOptimizer(imageOptimizerConfig),
      viteStaticCopy({
        targets: [
          {
            src: 'js/*.js',
            dest: 'js',
          },
          // {
          //   src: 'images/*',
          //   dest: 'images'
          // },
        ],
      }),
    ],
  };
});
