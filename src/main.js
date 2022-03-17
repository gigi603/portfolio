import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import VShowSlide from 'v-show-slide'
import VueEasyLightbox from 'vue-easy-lightbox'
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

Vue.config.productionTip = false
Vue.use(VShowSlide)
Vue.use(VueEasyLightbox)
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App),
  mounted() {
    AOS.init({
      duration: 600,
      once: true
    })
  },
}).$mount('#app')
