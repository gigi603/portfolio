<template>
  <transition name="viewer" :duration="200">
    <div
      v-if="visible && current"
      ref="dialog"
      class="viewer"
      role="dialog"
      aria-modal="true"
      :aria-label="current.title"
      @click.self="close"
      @keydown="onKeydown"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div class="viewer-top">
        <span class="viewer-count">{{ position + 1 }} / {{ screens.length }}</span>
        <button ref="closeButton" type="button" class="viewer-round" :aria-label="$t('viewer.close')" @click="close">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>
        </button>
      </div>

      <div class="viewer-frame" :class="current.device === 'mobile' ? 'viewer-frame-mobile' : 'viewer-frame-desktop'">
        <div v-if="current.device !== 'mobile'" class="viewer-bar" aria-hidden="true">
          <i></i><i></i><i></i>
          <span>{{ current.url }}</span>
        </div>
        <!-- Full-page captures scroll inside the frame -->
        <div ref="scroller" class="viewer-scroll" @scroll="hintVisible = false">
          <img :src="current.src" :alt="current.title" @load="checkOverflow">
        </div>
        <span v-if="hintVisible" class="viewer-hint">{{ $t('viewer.scrollHint') }}</span>
      </div>

      <div class="viewer-caption">
        <b><span class="viewer-number">{{ position + 1 }}</span>{{ current.title }}</b>
        <span v-if="current.caption">{{ current.caption }}</span>
      </div>

      <div class="viewer-nav">
        <button v-if="screens.length > 1" type="button" class="viewer-arrow viewer-arrow-prev" :aria-label="$t('viewer.previous')" @click="go(-1)">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="#9535d7" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div v-if="screens.length > 1" class="viewer-dots" aria-hidden="true">
          <i v-for="(screen, i) in screens" :key="i" :class="{ active: i === position }"></i>
        </div>
        <button v-if="screens.length > 1" type="button" class="viewer-arrow viewer-arrow-next" :aria-label="$t('viewer.next')" @click="go(1)">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="#9535d7" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
// This project runs Vue 2 (beforeDestroy), but the lint config uses Vue 3 rules
/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
export default {
  name: 'ScreenViewer',
  props: {
    // [{ src, title, caption, device: 'desktop' | 'mobile', url }]
    screens: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      position: this.index,
      hintVisible: false,
      hintShown: false,
      returnFocus: null,
      touchX: null,
      touchY: null,
    }
  },
  computed: {
    current() {
      return this.screens[this.position]
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(visible) {
        if (visible) this.open()
        else this.release()
      },
    },
    index(index) {
      this.position = index
    },
    position() {
      this.hintVisible = false
      this.$nextTick(() => {
        if (this.$refs.scroller) this.$refs.scroller.scrollTop = 0
      })
    },
  },
  beforeDestroy() {
    this.release()
  },
  methods: {
    open() {
      this.position = this.index
      this.hintShown = false
      this.returnFocus = document.activeElement
      document.body.style.overflow = 'hidden'
      this.$nextTick(() => this.$refs.closeButton && this.$refs.closeButton.focus())
    },
    release() {
      document.body.style.overflow = ''
      if (this.returnFocus && this.returnFocus.focus) this.returnFocus.focus()
      this.returnFocus = null
    },
    close() {
      this.$emit('hide')
    },
    go(step) {
      const count = this.screens.length
      this.position = (this.position + step + count) % count
      this.$emit('change', this.position)
    },
    // Show the scroll hint once per opening, only when the capture is taller than the frame
    checkOverflow() {
      const scroller = this.$refs.scroller
      if (!scroller || this.hintShown) return
      if (scroller.scrollHeight > scroller.clientHeight + 80) {
        this.hintVisible = true
        this.hintShown = true
      }
    },
    onKeydown(event) {
      if (event.key === 'Escape') {
        this.close()
      } else if (event.key === 'ArrowLeft' && this.screens.length > 1) {
        this.go(-1)
      } else if (event.key === 'ArrowRight' && this.screens.length > 1) {
        this.go(1)
      } else if (event.key === 'Tab') {
        // Keep keyboard focus inside the viewer
        const focusable = this.$refs.dialog.querySelectorAll('button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    },
    onTouchStart(event) {
      this.touchX = event.touches[0].clientX
      this.touchY = event.touches[0].clientY
    },
    // A mostly horizontal swipe of 50px or more changes screen; vertical swipes keep scrolling the frame
    onTouchEnd(event) {
      if (this.touchX === null || this.screens.length < 2) return
      const dx = event.changedTouches[0].clientX - this.touchX
      const dy = event.changedTouches[0].clientY - this.touchY
      if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) this.go(dx < 0 ? 1 : -1)
      this.touchX = null
    },
  },
}
</script>

<style scoped>
  .viewer {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(28, 12, 46, 0.72);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 70px 0 24px;
  }
  .viewer-top {
    position: absolute;
    top: 22px;
    left: 32px;
    right: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .viewer-count {
    background: rgba(255, 255, 255, 0.14);
    border-radius: 9999px;
    padding: 6px 14px;
    font-size: 13.5px;
    font-weight: 500;
  }
  .viewer-round {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);
    display: grid;
    place-items: center;
  }
  .viewer-frame {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 40px 90px rgba(0, 0, 0, 0.45);
  }
  .viewer-frame-desktop {
    width: min(1040px, 76vw);
    height: 72vh;
    border-radius: 20px;
  }
  .viewer-frame-mobile {
    height: 78vh;
    aspect-ratio: 9 / 19.5;
    border-radius: 36px;
    border: 10px solid #1f1a2b;
  }
  .viewer-bar {
    flex: 0 0 38px;
    height: 38px;
    background: #f4f1f8;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 16px;
    border-bottom: 1px solid #ece4f6;
  }
  .viewer-bar i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #dccbf0;
  }
  .viewer-bar span {
    margin-left: 14px;
    width: 300px;
    max-width: 50%;
    height: 22px;
    border-radius: 11px;
    background: #fff;
    font-size: 12px;
    color: #9a8fb0;
    display: flex;
    align-items: center;
    padding-left: 12px;
  }
  .viewer-scroll {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(149, 53, 215, 0.45) transparent;
  }
  .viewer-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .viewer-scroll::-webkit-scrollbar-thumb {
    background: rgba(149, 53, 215, 0.45);
    border-radius: 3px;
  }
  .viewer-scroll img {
    width: 100%;
    display: block;
  }
  .viewer-hint {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(28, 12, 46, 0.75);
    color: #fff;
    font-size: 12.5px;
    border-radius: 9999px;
    padding: 6px 14px;
    white-space: nowrap;
    pointer-events: none;
  }
  .viewer-caption {
    color: #fff;
    text-align: center;
    padding: 0 20px;
  }
  .viewer-caption b {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
  }
  .viewer-caption > span {
    font-size: 14px;
    opacity: 0.75;
  }
  .viewer-number {
    display: inline-grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #9535d7;
    font-size: 11px;
  }
  .viewer-nav {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .viewer-dots {
    display: flex;
    gap: 8px;
  }
  .viewer-dots i {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.35);
    transition: width 0.2s ease;
  }
  .viewer-dots i.active {
    width: 22px;
    background: #fff;
  }
  .viewer-arrow {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #fff;
    display: grid;
    place-items: center;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 768px) {
    .viewer-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .viewer-arrow-prev {
      left: 5vw;
    }
    .viewer-arrow-next {
      right: 5vw;
    }
  }
  @media (max-width: 767px) {
    .viewer-frame-desktop {
      width: 92vw;
      height: 62vh;
    }
    .viewer-frame-mobile {
      height: 66vh;
      max-width: 92vw;
    }
    .viewer-top {
      left: 16px;
      right: 16px;
      top: 14px;
    }
  }
  .viewer-enter-active,
  .viewer-leave-active {
    transition: opacity 0.2s ease;
  }
  .viewer-enter-active .viewer-frame,
  .viewer-leave-active .viewer-frame {
    transition: transform 0.2s ease;
  }
  .viewer-enter,
  .viewer-leave-to {
    opacity: 0;
  }
  .viewer-enter .viewer-frame,
  .viewer-leave-to .viewer-frame {
    transform: scale(0.96);
  }
  @media (prefers-reduced-motion: reduce) {
    .viewer-enter-active,
    .viewer-leave-active,
    .viewer-enter-active .viewer-frame,
    .viewer-leave-active .viewer-frame {
      transition: none;
    }
  }
</style>
