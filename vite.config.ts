import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import vitePlugin from 'vite-plugin-imp'
import path from 'path'
export default ({ mode }) => {
  const config = loadEnv(mode, './')
  console.log('111111111111111111', config.VITE_APP_BASEURL)
  return defineConfig({
    build: {
      outDir: path.resolve(__dirname, 'dist'), // 指定输出路径
      assetsDir: 'dist', // 一个相对于 outDir 的静态资源输出路径
      cssCodeSplit: true, // 输出的 css 是否是经过 拆分的
      sourcemap: false,
      emptyOutDir: true, // 构建时清空目标文件夹
      chunkSizeWarningLimit: 500, // 生成 chunk 大于这个数值会在控制台warning
      terserOptions: {
        // 生产环境下移除console
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: { // vite 内部使用 rollup 做打包
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/static/[name]-[hash].[ext]',
          manualChunks (id: any) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    plugins: [
      react(),
      vitePlugin({
        libList: [
          {
            libName: 'anted',
            style: (name) => `anted/es/${name}/style`
          }
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: { // 更改主题在这里
            'primary-color': '#52c41a',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
            hack: `true; @import (reference) "${path.resolve('src/less/base.less')}";`
          },
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      // 配置别名 为src引入
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: '127.0.0.1',
      hmr: true,
      port: 8081,
      proxy: {
        '/api': {
          target: 'http://10.99.100.242:8080',
          // target: config.VITE_APP_BASEURL,
          changeOrigin: true,
          ws: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
