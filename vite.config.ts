import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 在根目录下的vite.config.ts修改server属性
  server: {
    proxy: {
      "/api": {
        target: "https://c.m.163.com",
        changeOrigin:true,
        rewrite:(path)=> path.replace(/^\/api/,'')
      },
    }
  }
})
