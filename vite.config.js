import { resolve } from 'path';
import { defineConfig } from 'vite';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const PRODUCTION = process.env.NODE_ENV === 'production';
const define = {
  __PRODUCTION__: PRODUCTION,
};

export default defineConfig({
  plugins: [],
  // 打包配置
  build: {
    lib: {
      formats: ['umd'],
      entry: resolve(__dirname, 'main.js'), // 入口
      name: 'commonResource', // 安裝、引入用
      fileName: (format) => `scms-common-resource.${format}.js`, // 打包后名称
    },
    outDir: 'lib',
    emptyOutDir: false,
    sourcemap: true, // 输出sourcemap
    rollupOptions: {
      plugins: [
        getBabelOutputPlugin({
          presets: [
            ['@babel/preset-env', { useBuiltIns: false, modules: 'umd' }],
          ],
          allowAllFormats: true,
        }),
      ],
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  define,
});
