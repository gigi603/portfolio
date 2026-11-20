import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import './app/styles/base.css'
import App from './app/App.vue'
import { router } from './app/router'
import { followPortfolioLocale, i18n } from './shared/i18n'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')

followPortfolioLocale()
