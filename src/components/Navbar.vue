<template>
  <nav class="container mx-auto md:flex md:justify-between md:items-center px-2 py-3">
      <div class="flex items-center justify-between">
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden px-6">
          <button
            type="button"
            class="
              text-white
              border-2
              py-2
              px-2
              border-white
              rounded-lg 
              hover:text-gray-400
              focus:outline-none focus:text-gray-400
            "
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul 
        :class="showMenu ? 'flex' : 'hidden'" 
        class="
          flex-col 
          mt-8 
          space-y-4
          text-center
          md:flex 
          md:space-y-0
          md:flex-row
          md:items-center
          md:space-x-10
          md:mt-0
          
        ">
          
          <router-link to="/" class="px-6 py-2.5 font-normal text-base flex items-center text-center text-white hover:opacity-75">Home</router-link>
          <router-link to="/projects" class="px-6 py-2.5 w-full font-normal text-base flex items-center text-white hover:opacity-75">Projects</router-link>
          <router-link to="/practices" class="px-6 py-2.5 font-normal text-base flex items-center text-white hover:opacity-75">Practices</router-link>
          <router-link to="/contact" class="px-6 py-2 font-normal text-base flex items-center text-white hover:opacity-75">Contact</router-link>
      </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleNav: function () {
      this.showMenu = !this.showMenu;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-exact-active {
    font-weight: bold;
    text-decoration-line: underline;
    text-decoration-color: #fff;
    text-underline-offset: 8px;
  }
</style>
