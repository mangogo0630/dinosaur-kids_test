import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import {
  dismissBootstrapLoader,
  preloadCriticalAssets,
  preloadDeferredAssets,
  waitForMinLoaderVisible,
} from './utils/preload'
import './bootstrap.css'
import './style.css'

async function bootstrap() {
  const loaderStartedAt = performance.now()
  await preloadCriticalAssets()
  await waitForMinLoaderVisible(loaderStartedAt)

  const app = createApp(App)
  app.use(router).use(VueCookies).mount('#app')

  dismissBootstrapLoader()
  preloadDeferredAssets()
}

void bootstrap()
