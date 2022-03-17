<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3">
  <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
    <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
      <ul class="flex flex-col lg:flex-row list-none ml-auto">
          
          <router-link to="/" class="nav-item px-4 py-2.5 font-normal text-base flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">Home</router-link>
          <router-link to="/projects" class="nav-item px-4 py-2.5 font-normal text-base flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">Projects</router-link>
          <router-link to="/practices" class="nav-item px-4 py-2.5 font-normal text-base flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">Practices</router-link>
          <router-link to="/contact" class="nav-item px-4 py-2 font-normal text-base flex items-center text-xs font-bold leading-snug text-white hover:opacity-75">Contact</router-link>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
