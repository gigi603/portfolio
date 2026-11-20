<template>
  <div class="frame-nav">
    <!-- Dark frame around the page (inspired by greymac.com), drawn above the content -->
    <div class="edge" aria-hidden="true"></div>
    <nav class="notch" :class="{ compact }" :aria-label="$t('nav.mainLabel')" @mouseenter="compact = false" @focusin="compact = false">
      <span class="nmask" aria-hidden="true"></span>
      <div class="nl">
        <router-link v-for="link in sectionLinks.slice(0, 2)" :key="link.id" :to="{ path: '/', hash: `#${link.id}` }" class="link" :class="{ active: activeSection === link.id }">{{ $t(`nav.${link.key}`) }}</router-link>
      </div>
      <router-link to="/" class="lockup" :aria-label="$t('nav.homeLabel')">
        <img src="@/assets/icons/logo-gilbert.svg" alt="" width="36" height="36">
        <span><b>Gilbert Trinidad</b><small>Product Designer</small></span>
      </router-link>
      <div class="nr">
        <router-link v-for="link in sectionLinks.slice(2)" :key="link.id" :to="{ path: '/', hash: `#${link.id}` }" class="link" :class="{ active: activeSection === link.id }">{{ $t(`nav.${link.key}`) }}</router-link>
        <a href="#contact" class="link">{{ $t('nav.contactShort') }}</a>
        <LanguageSwitcher class="lg"/>
      </div>
      <button type="button" class="menu" aria-haspopup="dialog" :aria-expanded="showMenu ? 'true' : 'false'" @click="openMenu">{{ $t('nav.menu') }}<i aria-hidden="true"></i></button>
    </nav>

    <!-- Mobile full-screen menu. Clicks on any link inside close it. -->
    <div v-if="showMenu" ref="sheet" class="sheet" role="dialog" aria-modal="true" :aria-label="$t('nav.menu')" @keydown="onSheetKeydown" @click="onSheetClick">
      <div class="sheet-top">
        <router-link to="/" class="lockup">
          <img src="@/assets/icons/logo-gilbert.svg" alt="" width="32" height="32">
          <span><b>Gilbert Trinidad</b><small>Product Designer</small></span>
        </router-link>
        <button type="button" ref="closeButton" class="close" :aria-label="$t('nav.closeMenu')" @click="closeMenu">
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      <ul class="sheet-links">
        <li v-for="link in sectionLinks" :key="link.id">
          <router-link :to="{ path: '/', hash: `#${link.id}` }" :class="{ active: activeSection === link.id }">{{ $t(`nav.${link.key}`) }}<span aria-hidden="true">→</span></router-link>
        </li>
        <li><a href="#contact">{{ $t('nav.contactShort') }}<span aria-hidden="true">→</span></a></li>
        <li><a :href="cvUrl" download>{{ $t('nav.downloadCv') }}<span aria-hidden="true">↓</span></a></li>
      </ul>
      <div class="sheet-bottom"><LanguageSwitcher/></div>
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
      compact: false,
      lastY: 0,
    };
  },
  computed: {
    cvUrl() {
      return this.$i18n.locale === 'en' ? '/files/Gilbert-Trinidad-Resume.pdf' : '/files/Gilbert-Trinidad-CV.pdf'
    },
    sectionLinks() {
      return [
        { id: 'projects', key: 'projects' },
        { id: 'process', key: 'process' },
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
  mounted() {
    window.addEventListener('scroll', this.onScrollCompact, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrollCompact)
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
    // The notch shrinks to the logo when scrolling down, and opens again when scrolling up
    onScrollCompact() {
      const y = window.scrollY
      this.compact = y > 200 && y > this.lastY
      this.lastY = y
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
  .edge {
    position: fixed;
    inset: 12px;
    border-radius: 24px;
    border: 1px solid var(--hair);
    box-shadow: 0 0 0 40px var(--frame), inset 0 0 60px rgba(149, 53, 215, 0.1);
    pointer-events: none;
    z-index: 50;
  }
  .notch {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 60;
    height: 74px;
    width: max-content;
    display: flex;
    align-items: center;
    gap: 34px;
    padding: 0 30px;
    background: var(--frame);
    border: 1px solid var(--hair);
    border-top: 0;
    border-radius: 0 0 26px 26px;
    box-shadow: 0 18px 40px -18px rgba(149, 53, 215, 0.55);
    font-family: Urbanist, system-ui, sans-serif;
    transition: gap 0.4s ease;
  }
  /* Curved shoulders that join the notch to the frame */
  .notch::before,
  .notch::after {
    content: "";
    position: absolute;
    top: 12px;
    width: 20px;
    height: 20px;
    pointer-events: none;
  }
  .notch::before { left: -21px; background: radial-gradient(circle at 0 100%, transparent 19.5px, var(--hair) 19.5px 20.5px, var(--frame) 20.5px); }
  .notch::after { right: -21px; background: radial-gradient(circle at 100% 100%, transparent 19.5px, var(--hair) 19.5px 20.5px, var(--frame) 20.5px); }
  .nmask { position: absolute; top: 0; left: -1px; right: -1px; height: 31px; background: var(--frame); pointer-events: none; }
  .notch > *:not(.nmask) { position: relative; }
  .nl, .nr {
    display: flex;
    align-items: center;
    gap: 28px;
    overflow: hidden;
    max-width: 420px;
    transition: max-width 0.4s ease, opacity 0.3s ease;
  }
  .link {
    color: #cdc9e7;
    font-family: Urbanist, system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
  }
  .link:hover, .link.active { color: #fff; }
  .link:focus-visible, .lockup:focus-visible, .menu:focus-visible { outline: 2px solid #c58cf2; outline-offset: 4px; border-radius: 8px; }
  .lg { margin-left: 6px; padding-left: 22px; border-left: 1px solid rgba(255, 255, 255, 0.1); }
  .lockup { display: flex; align-items: center; gap: 12px; }
  .lockup img { filter: drop-shadow(0 0 12px rgba(149, 53, 215, 0.6)); }
  .lockup span { display: flex; flex-direction: column; line-height: 1.15; white-space: nowrap; font-family: Urbanist, system-ui, sans-serif; }
  .lockup b { font-size: 16px; font-weight: 800; color: #fff; font-family: inherit; }
  .lockup small {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    font-family: inherit;
    background: linear-gradient(90deg, #b865f2 0%, #a15cef 50%, #6e8bff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .menu { display: none; }
  .notch.compact { gap: 0; }
  .notch.compact .nl, .notch.compact .nr { max-width: 0; opacity: 0; }

  .sheet {
    position: fixed;
    inset: 0;
    z-index: 70;
    background: #0d0b17;
    padding: 20px 24px 32px;
    display: flex;
    flex-direction: column;
    font-family: Urbanist, system-ui, sans-serif;
  }
  .sheet-top { display: flex; align-items: center; justify-content: space-between; }
  .close { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.14); }
  .sheet-links { list-style: none; margin: 48px 0 0; padding: 0; flex-grow: 1; }
  .sheet-links a {
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    font-family: Urbanist, system-ui, sans-serif;
    font-size: 26px;
    font-weight: 800;
  }
  .sheet-links a span { color: #c58cf2; font-family: Urbanist, system-ui, sans-serif; }
  .sheet-bottom { padding-top: 24px; }

  @media (prefers-reduced-motion: reduce) {
    .notch, .nl, .nr { transition: none; }
  }
  @media (max-width: 860px) {
    .edge { inset: 6px; border-radius: 18px; }
    .notch { height: 62px; gap: 18px; padding: 0 10px 0 16px; border-radius: 0 0 20px 20px; }
    .notch::before, .notch::after { top: 6px; }
    .nmask { height: 25px; }
    .nl, .nr { display: none; }
    .lockup img { width: 30px; height: 30px; }
    .lockup b { font-size: 14px; }
    .lockup small { font-size: 11px; }
    .menu {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font: 800 12px Urbanist, system-ui, sans-serif;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 999px;
      padding: 8px 12px;
    }
    .menu i { width: 14px; height: 8px; border-top: 2px solid #fff; border-bottom: 2px solid #fff; }
  }
</style>
