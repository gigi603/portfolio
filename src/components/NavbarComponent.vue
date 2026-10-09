<template>
  <div class="container mx-auto max-w-7xl px-6 pt-6">
  <nav class="w-full bg-white rounded-3xl shadow-lg px-2 lg:px-6 py-3">
    <div class="flex flex-wrap items-center w-full">
      <div class="flex flex-1 justify-start">
        <router-link to="/" class="py-2.5 px-2 lg:px-0 flex items-center text-black hover:opacity-75">
          <img src="@/assets/icons/logo-portfolio.svg" class="w-14" alt="Gilbert Trinidad">
        </router-link>
      </div>

      <!-- Desktop: links centered -->
      <div class="hidden lg:flex items-center justify-center gap-2">
        <router-link to="/" exact class="nav-link px-4 py-2.5 hover:opacity-75">{{ $t('nav.home') }}</router-link>
        <router-link to="/projects" class="nav-link px-4 py-2.5 hover:opacity-75">{{ $t('nav.projects') }}</router-link>
        <a href="/#about" class="nav-link px-4 py-2.5 hover:opacity-75">{{ $t('nav.about') }}</a>
        <a :href="cvUrl" target="_blank" rel="noopener" class="nav-link px-4 py-2.5 hover:opacity-75">{{ $t('nav.cv') }}</a>
      </div>

      <!-- Desktop: contact + language on the right / Mobile: language + burger -->
      <div class="flex flex-1 items-center justify-end gap-4">
        <a href="#contact" class="hidden lg:inline-block px-6 py-2.5 text-center text-white font-bold rounded-full hover:opacity-75 nav-link" style="background-color: #9535d7;">{{ $t('nav.contact') }}</a>
        <LanguageSwitcher/>
        <button
          type="button"
          @click="toggleNav"
          :aria-expanded="showMenu ? 'true' : 'false'"
          aria-label="Menu"
          class="lg:hidden text-black border-2 py-2 px-2 border-black rounded-lg hover:text-gray-400 focus:outline-none focus:text-gray-400"
        >
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMenu" class="lg:hidden w-full flex flex-col items-center space-y-4 my-8 text-center">
        <router-link to="/" exact class="nav-link px-6 py-2.5 hover:opacity-75">{{ $t('nav.home') }}</router-link>
        <router-link to="/projects" class="nav-link px-6 py-2.5 hover:opacity-75">{{ $t('nav.projects') }}</router-link>
        <a href="/#about" class="nav-link px-6 py-2.5 hover:opacity-75" @click="showMenu = false">{{ $t('nav.about') }}</a>
        <a :href="cvUrl" target="_blank" rel="noopener" class="nav-link px-6 py-2.5 hover:opacity-75" @click="showMenu = false">{{ $t('nav.cv') }}</a>
        <a href="#contact" class="nav-link px-6 py-2.5 text-white font-bold rounded-full hover:opacity-75" style="background-color: #9535d7;" @click="showMenu = false">{{ $t('nav.contact') }}</a>
      </div>
    </div>
  </nav>
  </div>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue'

export default {
  name: 'NavbarComponent',
  components: { LanguageSwitcher },
  data() {
    return {
      showMenu: false,
      cvUrl: '/files/Gilbert-Trinidad-CV.pdf',
    };
  },
  watch: {
    // Close the mobile menu after navigating to another page
    $route() {
      this.showMenu = false;
    },
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
  .nav-link {
    font-size: 18px;
  }
  .router-link-exact-active {
    font-weight: bold;
    text-decoration-line: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 4px;
  }
</style>
