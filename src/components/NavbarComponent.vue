<template>
  <div class="navbar-wrapper">
    <div class="container mx-auto max-w-7xl px-3 md:px-6">
      <nav class="navbar">
        <router-link to="/" class="brand" :aria-label="$t('nav.homeLabel')">
          <img src="@/assets/icons/logo-portfolio.svg" alt="">
          <span class="brand-text">
            <b>Gilbert Trinidad</b>
            <small>Product Designer</small>
          </span>
        </router-link>

        <!-- Desktop links, centered -->
        <div class="links">
          <router-link
            v-for="link in sectionLinks"
            :key="link.id"
            :to="{ path: '/', hash: `#${link.id}` }"
            class="link"
            :class="{ active: activeSection === link.id }"
          >{{ $t(`nav.${link.key}`) }}</router-link>
          <a :href="cvUrl" target="_blank" rel="noopener" class="link link-cv">
            {{ $t('nav.cv') }}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <!-- Contact + language on the right; burger on mobile -->
        <div class="actions">
          <a href="#contact" class="cta">{{ $t('nav.contact') }}</a>
          <LanguageSwitcher/>
          <button type="button" class="burger" :aria-label="$t('nav.openMenu')" aria-haspopup="dialog" :aria-expanded="showMenu ? 'true' : 'false'" @click="openMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" stroke="#111" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile full-screen menu. Clicks on any link inside close it. -->
    <div v-if="showMenu" ref="sheet" class="sheet" role="dialog" aria-modal="true" :aria-label="$t('nav.menu')" @keydown="onSheetKeydown" @click="onSheetClick">
      <div class="sheet-top">
        <router-link to="/" class="brand">
          <img src="@/assets/icons/logo-portfolio.svg" alt="">
          <span class="brand-text">
            <b>Gilbert Trinidad</b>
            <small>Product Designer</small>
          </span>
        </router-link>
        <button type="button" ref="closeButton" class="close" :aria-label="$t('nav.closeMenu')" @click="closeMenu">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#111" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      <ul class="sheet-links">
        <li v-for="link in sectionLinks" :key="link.id">
          <router-link :to="{ path: '/', hash: `#${link.id}` }" :class="{ active: activeSection === link.id }">
            {{ $t(`nav.${link.key}`) }}<span aria-hidden="true">→</span>
          </router-link>
        </li>
        <li>
          <a :href="cvUrl" target="_blank" rel="noopener">
            {{ $t('nav.downloadCv') }}<span aria-hidden="true">↓</span>
          </a>
        </li>
      </ul>
      <div class="sheet-bottom">
        <a v-if="bookingUrl" :href="bookingUrl" target="_blank" rel="noopener" class="sheet-btn sheet-btn-primary">{{ $t('nav.bookCall') }}</a>
        <a href="#contact" class="sheet-btn sheet-btn-outline">{{ $t('nav.contact') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
// This project runs Vue 2 (beforeDestroy), but the lint config uses Vue 3 rules
/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
import LanguageSwitcher from './LanguageSwitcher.vue'
import { BOOKING_URL } from '../config'

// Set to true once the Services section exists on the home page
const SHOW_SERVICES = false

export default {
  name: 'NavbarComponent',
  components: { LanguageSwitcher },
  data() {
    return {
      showMenu: false,
      bookingUrl: BOOKING_URL,
      activeSection: null,
      scrollFrame: null,
      spyTimer: null,
    };
  },
  computed: {
    cvUrl() {
      return this.$i18n.locale === 'en' ? '/files/Gilbert-Trinidad-Resume.pdf' : '/files/Gilbert-Trinidad-CV.pdf'
    },
    sectionLinks() {
      return [
        { id: 'projects', key: 'projects' },
        SHOW_SERVICES && { id: 'services', key: 'services' },
        { id: 'about', key: 'about' },
      ].filter(Boolean)
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.closeMenu()
        // A hash change on the same page doesn't need a new observer
        if (from && to.path === from.path) return
        this.$nextTick(this.setupScrollSpy)
      },
    },
  },
  beforeDestroy() {
    this.stopScrollSpy()
    document.body.style.overflow = ''
  },
  methods: {
    setupScrollSpy() {
      this.stopScrollSpy()
      if (this.$route.path !== '/') {
        this.activeSection = this.$route.path.startsWith('/project') ? 'projects' : null
        return
      }
      window.addEventListener('scroll', this.onScroll, { passive: true })
      // Sections render with the page, so give them a moment to exist
      this.spyTimer = setTimeout(this.updateActiveSection, 200)
    },
    stopScrollSpy() {
      window.removeEventListener('scroll', this.onScroll)
      cancelAnimationFrame(this.scrollFrame)
      clearTimeout(this.spyTimer)
    },
    onScroll() {
      cancelAnimationFrame(this.scrollFrame)
      this.scrollFrame = requestAnimationFrame(this.updateActiveSection)
    },
    // The active link is the section crossing a line 40% down the viewport
    updateActiveSection() {
      const line = window.innerHeight * 0.4
      const current = this.sectionLinks.find(link => {
        const section = document.getElementById(link.id)
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= line && rect.bottom > line
      })
      this.activeSection = current ? current.id : null
    },
    openMenu() {
      this.showMenu = true
      document.body.style.overflow = 'hidden'
      this.$nextTick(() => this.$refs.closeButton && this.$refs.closeButton.focus())
    },
    closeMenu() {
      if (!this.showMenu) return
      this.showMenu = false
      document.body.style.overflow = ''
    },
    onSheetClick(event) {
      if (event.target.closest('a')) this.closeMenu()
    },
    onSheetKeydown(event) {
      if (event.key === 'Escape') {
        this.closeMenu()
        return
      }
      if (event.key !== 'Tab') return
      // Keep keyboard focus inside the open menu
      const focusable = this.$refs.sheet.querySelectorAll('a[href], button')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
  },
}
</script>

<style scoped>
  .navbar-wrapper {
    position: sticky;
    top: 16px;
    z-index: 50;
    margin-top: 16px;
  }
  .navbar {
    height: 64px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.88);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow: 0 6px 24px rgba(61, 22, 87, 0.08);
    padding: 0 14px 0 16px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #111;
    justify-self: start;
  }
  .brand img {
    width: 38px;
    height: 38px;
  }
  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }
  .brand-text b {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 15px;
  }
  .brand-text small {
    font-size: 12px;
    color: #7a7a7a;
  }
  .links {
    display: flex;
    gap: 6px;
  }
  .link {
    position: relative;
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    color: #222;
    transition: color 150ms ease;
  }
  .link:hover {
    color: #9535d7;
  }
  .link.active {
    color: #9535d7;
    font-weight: 600;
  }
  .link.active::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9535d7;
    transform: translateX(-50%);
  }
  .link-cv {
    color: #7a7a7a;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .actions {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .cta {
    background: #9535d7;
    color: #fff;
    border-radius: 9999px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    transition: opacity 150ms ease;
  }
  .cta:hover {
    opacity: 0.85;
  }
  .burger {
    display: none;
    width: 40px;
    height: 40px;
    place-items: center;
    background: none;
    border: 0;
  }
  @media (max-width: 1023px) {
    .navbar {
      grid-template-columns: 1fr auto;
      padding: 0 8px 0 12px;
    }
    .links,
    .cta {
      display: none;
    }
    .burger {
      display: grid;
    }
    .actions {
      gap: 10px;
    }
    .brand-text b {
      font-size: 14px;
    }
  }

  .sheet {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
  }
  .sheet-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: none;
    border: 0;
  }
  .sheet-links {
    list-style: none;
    margin-top: 48px;
  }
  .sheet-links a {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 30px;
    color: #111;
    padding: 14px 4px;
    border-bottom: 1px solid #f1eaf9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sheet-links a.active {
    color: #9535d7;
  }
  .sheet-links span {
    font-size: 20px;
    color: #c9b3e6;
  }
  .sheet-bottom {
    margin-top: auto;
    padding-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .sheet-btn {
    text-align: center;
    border-radius: 9999px;
    padding: 15px 28px;
    font-weight: 600;
    font-size: 15px;
  }
  .sheet-btn-primary {
    background: #9535d7;
    color: #fff;
    box-shadow: 0 10px 24px rgba(149, 53, 215, 0.3);
  }
  .sheet-btn-outline {
    border: 2px solid #9535d7;
    color: #9535d7;
  }
</style>
