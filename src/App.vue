<template>
  <div id="app" class="w-full m-0 p-0">
    <NavbarComponent/>
      <router-view :data="datas"/>
      <FooterComponent/>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import Vue from 'vue'
import notification from 'vue-notification-ui'
Vue.use(notification, {
  position: 'notification-top-right', // top, bottom, left, right
  duration: 5000, // default
  left: 20, // default
  bottom: 20, // default
  top: 20, // default
  right: 40 // default
})

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  },
  props: {
    datas: {
    type: Array,
    default: () => [],
  },
  },
}
</script>

<style>

@font-face {
  font-family: 'Montserrat';
  src: url('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf') format('truetype');
  /* Ajoutez les autres formats de police si vous les avez téléchargés (ex. woff, woff2, etc.) */
}

@font-face {
  font-family: 'Poppins';
  src: url('./assets/fonts/Poppins/Poppins-Regular-400.ttf') format('truetype');
  /* Ajoutez les autres formats de police si vous les avez téléchargés (ex. woff, woff2, etc.) */
}
@font-face {
  font-family: 'Montserrat';
  font-weight: 700;
  src: url('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf') format('truetype');
}
@font-face {
  font-family: 'Montserrat';
  font-weight: 800;
  src: url('./assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-weight: 500;
  src: url('./assets/fonts/Poppins/Poppins Medium 500.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-weight: 600;
  src: url('./assets/fonts/Poppins/Poppins SemiBold 600.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-weight: 700;
  src: url('./assets/fonts/Poppins/Poppins-Bold-700.ttf') format('truetype');
}
h1, h2, h3 {
  font-family: "Montserrat", sans-serif;
}

/* Keep anchored sections clear of the sticky navbar */
[id] {
  scroll-margin-top: 96px;
}

p, span, li, a {
  font-family: "Poppins", sans-serif;
}

#nav {
  padding: 30px;
}

body {
  background-color: #EEE6FF;
}

.border-color-card {
  border: 1px solid #E3E3E3;
}

</style>
