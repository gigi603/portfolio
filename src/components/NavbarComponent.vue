<template>
  <nav class="w-full bg-white px-2 py-3 flex flex-wrap">
    <div class="flex flex-wrap w-11/12 mx-auto md:px-6">
      <ul class="flex w-11/12 md:w-1/12 justify-start">
        <router-link to="/" class="md:px-6 py-2.5 flex flex-wrap justify-start items-start text-black hover:opacity-75">
          <img src="@/assets/icons/logo.svg" class="w-14">
        </router-link>
      </ul>
    
        <div class="flex w-1/12 justify-end">
          <div @click="toggleNav" class="flex w-full justify-end items-center md:hidden md:px-6">
            <button
              type="button"
              class="w-12/12 md:w-1/12 text-black text-center border-2 py-2 px-2 border-black rounded-lg  hover:text-gray-400 focus:outline-none focus:text-gray-400
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
            w-full
            flex-col 
            my-8
            sm:items-center
            space-y-4
            text-center
            md:flex 
            md:space-y-0
            md:flex-row
            md:w-10/12
            md:justify-end
            md:space-x-20
            md:mt-2
            md:mb-2
          "
>
<router-link to="/" class="px-6 py-2.5 text-base text-center text-black hover:opacity-75">Accueil</router-link>
            <router-link to="/projects" class="px-6 py-2.5 text-base text-center text-black hover:opacity-75">Projets</router-link>
            <!--<router-link to="/practices" class="px-6 py-2.5 text-base text-center text-black hover:opacity-75">Travaux</router-link>-->
            <a href="#contact" class="px-6 py-2.5 text-base text-center text-black hover:opacity-75">Me contacter</a>
        </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
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
    text-underline-offset: 8px;
  }
</style>
