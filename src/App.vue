<template>
  <div id="app" class="container mx-auto max-w-7xl">
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

.font-bold {
  font-weight: 900;
}

#nav {
  padding: 30px;
}

a {
  font-weight: normal;
}

body {
  background-color: #4169E1;
}

.border-color-card {
  border: 1px solid #E3E3E3;
}

</style>
