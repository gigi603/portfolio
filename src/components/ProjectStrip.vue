<template>
  <div class="strip-wrap" :aria-label="$t('strip.label')" role="region">
    <div class="fade fade-left" aria-hidden="true"></div>
    <div class="fade fade-right" aria-hidden="true"></div>
    <div
      ref="track"
      class="strip"
      @mouseenter="pause"
      @mouseleave="resume"
      @focusin="pause"
      @focusout="resume"
      @touchstart.passive="pause"
      @touchend.passive="resumeLater"
    >
      <!-- The list is rendered twice so the loop is seamless; the copy is hidden from assistive tech -->
      <div v-for="copy in 2" :key="copy" class="strip-list" :aria-hidden="copy === 2 ? 'true' : null">
        <router-link
          v-for="(card, index) in cards"
          :key="`${copy}-${index}`"
          :to="{ name: 'ProjectDetailComponent', params: { id: card.projectId } }"
          class="card"
          :tabindex="copy === 2 ? -1 : null"
        >
          <img :src="card.src" :alt="copy === 2 ? '' : $t('strip.alt', { name: card.name, screen: $t(`strip.screens.${card.screen}`) })" loading="lazy">
          <span>{{ card.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// This project runs Vue 2 (beforeDestroy), but the lint config uses Vue 3 rules
/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
// Pixels per second; one loop of the list takes about 40s on desktop
const LOOP_SECONDS = 40

export default {
  name: 'ProjectStrip',
  data() {
    return {
      // Face-free screens only
      cards: [
        { projectId: '2', name: 'Melodie Yeremian', screen: 'services', src: require('@/assets/images/projects/MelodieYeremian/melodieyeremian-prestations.png') },
        { projectId: '1', name: 'SPCoach', screen: 'pricing', src: require('@/assets/images/projects/SPCoach/mes-tarifs-min.png') },
        { projectId: '3', name: 'Atypikhouse', screen: 'home', src: require('@/assets/images/projects/vignette-atypikhouse.png') },
        { projectId: '2', name: 'Melodie Yeremian', screen: 'pricing', src: require('@/assets/images/projects/MelodieYeremian/melodieyeremian-tarifs.png') },
        { projectId: '4', name: 'Unfate', screen: 'home', src: require('@/assets/images/projects/vignette-unfate.png') },
        { projectId: '1', name: 'SPCoach', screen: 'confirmation', src: require('@/assets/images/projects/SPCoach/page-de-confirmation-min.png') },
        { projectId: '2', name: 'Melodie Yeremian', screen: 'shop', src: require('@/assets/images/projects/MelodieYeremian/melodieyeremian-boutique.png') },
      ],
      paused: false,
      frame: null,
      lastTime: null,
      resumeTimer: null,
    }
  },
  mounted() {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reducedMotion) this.frame = requestAnimationFrame(this.step)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.frame)
    clearTimeout(this.resumeTimer)
  },
  methods: {
    // Scroll the track instead of animating a transform, so people can still swipe it on touch screens
    step(time) {
      const track = this.$refs.track
      if (track && !this.paused && this.lastTime !== null) {
        const loopWidth = track.scrollWidth / 2
        const speed = loopWidth / LOOP_SECONDS
        track.scrollLeft += speed * (time - this.lastTime) / 1000
        if (track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth
      }
      this.lastTime = time
      this.frame = requestAnimationFrame(this.step)
    },
    pause() {
      clearTimeout(this.resumeTimer)
      this.paused = true
    },
    resume() {
      this.paused = false
    },
    resumeLater() {
      clearTimeout(this.resumeTimer)
      this.resumeTimer = setTimeout(this.resume, 2000)
    },
  },
}
</script>

<style scoped>
  .strip-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 60px;
  }
  .strip {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 10px 0 30px;
  }
  .strip::-webkit-scrollbar {
    display: none;
  }
  .strip-list {
    display: flex;
    gap: 24px;
    padding-right: 24px;
    flex-shrink: 0;
  }
  .card {
    position: relative;
    flex: 0 0 380px;
    height: 238px;
    border-radius: 18px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 18px 40px rgba(61, 22, 87, 0.14);
  }
  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  .card span {
    position: absolute;
    left: 12px;
    bottom: 12px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 9999px;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #111;
  }
  .fade {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 120px;
    z-index: 2;
    pointer-events: none;
  }
  .fade-left {
    left: 0;
    background: linear-gradient(90deg, #eee6ff, rgba(238, 230, 255, 0));
  }
  .fade-right {
    right: 0;
    background: linear-gradient(-90deg, #eee6ff, rgba(238, 230, 255, 0));
  }
  @media (max-width: 640px) {
    .card {
      flex-basis: 260px;
      height: 163px;
    }
    .strip-list {
      gap: 14px;
      padding-right: 14px;
    }
    .fade {
      width: 40px;
    }
  }
</style>
