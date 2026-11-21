import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { applyPisteMessages } from './pistes'
import './index.css'
import VShowSlide from 'v-show-slide'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AOS from 'aos'
import 'aos/dist/aos.css'

library.add(faChevronDown);
library.add(faChevronUp);
library.add(faChevronLeft);
library.add(faPaperPlane);

applyPisteMessages(i18n)
Vue.config.productionTip = false
Vue.use(VShowSlide)
Vue.component("FontAwesomeIcon", FontAwesomeIcon);

new Vue({
  router,
  i18n,
  mounted() {
    // Elements zoom in gently as they scroll into view (desktop and mobile).
    // Turned off for people who ask their system to reduce motion.
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 60,
      once: true,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  },
  render: h => h(App),
}).$mount('#app')
