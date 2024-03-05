import { defineConfig } from "vite";
import * as glob from 'glob';
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";


export default defineConfig(({ command }) => {
  return {
    base: './',
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src",
    filenameHashing: false,
    build: {
      cssCodeSplit: true,
      minify: false, 
      css: {
        minify: false
      },
      sourcemap: false,

      rollupOptions: {
        emptyOutDir: true,
        input: glob.sync("./src/*.html"),
        output: {
          assetFileNames: (assetInfo) => {
            
            // [ 'name', 'source', 'type' ]
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name][extname]';
            }

            if (assetInfo.name.endsWith('.js')) {
              return 'js/[name][extname]';
            }
            
            if (assetInfo.name.endsWith('.jpg') || assetInfo.name.endsWith('.png')) {
              const folder = assetInfo.name?.split("_")?.[0]
              if (folder?.length) {
                return `images/${folder}/[name][extname]`; 
              }
            }

            

            if (assetInfo.name == "icons.svg") {
              return 'images/[name][extname]';
            }
            
            return 'assets/[name][extname]';
          },
        },
      },
      outDir: "../dist",
    },
  
    plugins: [
      injectHTML(),
      FullReload("./src/**/**.html"),
      ViteImageOptimizer({
        png: {
          quality: 86,
        },
        jpeg: {
          quality: 86,
        },
        jpg: {
          quality: 86,
        },
      }),
      
    ],
  };
});