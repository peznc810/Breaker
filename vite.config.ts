import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname} from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
// import vueI18n from '@intlify/vite-plugin-vue-i18n';

// 獲取路徑名的兩種寫法
/** 第一種（較具靈活性）
 * @filename 將文件 URL 轉換為文件路徑
 * @dirname 將目錄 URL 轉換為目錄路徑
 */
// const __filename = fileURLToPath(new URL(import.meta.url));
// const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** 第二種（較簡潔）
 * @filename 直接轉換當前模塊的 URL 為文件路徑
 * @dirname 然後使用 dirname(__filename) 獲取目錄名
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    // TODO: 目前自動翻譯失敗
    // vueI18n({
    //   include: resolve(__dirname, './src/locales/**')
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
