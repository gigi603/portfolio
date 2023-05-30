<template>
  <div id="app" class="w-full m-0 p-0" style="background-color: #eee6ff">
    <Navbar/>
      <router-view :data="datas"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
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
  props: {
    datas: Array
  },
  components: {
    Navbar,
  },
}
</script>

<style>

h1, h2, h3 {
  font-family: "Montserrat", "sans-serif";
}

p, span, li, a {
  font-family: "Poppins", "sans-serif";
}

#nav {
  padding: 30px;
}

a {
  font-weight: normal;
}

body {
  background-color: #FFF;
}

.border-color-card {
  border: 1px solid #E3E3E3;
}

</style>
