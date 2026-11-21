<template>
  <div class="deck" role="dialog" aria-modal="true" :aria-label="`${name} · ${$t('cs.caseStudy')}`" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
    <div class="top">
      <p class="t"><b>{{ name }}</b><span aria-hidden="true">·</span><span>{{ $t('cs.caseStudy') }}</span></p>
      <button ref="close" type="button" class="close" @click="$emit('close')">✕ {{ $t('cs.quit') }}</button>
    </div>

    <div class="stage">
      <button type="button" class="arrow l" :disabled="current === 0" :aria-label="$t('cs.prev')" @click="go(-1)">←</button>

      <div class="slide" aria-live="polite">
        <template v-for="(slide, i) in slides">
          <div v-if="i === current" :key="i" class="slide-in">
            <p class="num"><em>{{ slide.num }}</em>{{ slide.label }}</p>

            <!-- cover -->
            <div v-if="slide.type === 'cover'" class="cover">
              <div>
                <h1>{{ slide.title[0] }}<span class="grad">{{ slide.title[1] }}</span>{{ slide.title[2] }}</h1>
                <p class="lead">{{ slide.intro }}</p>
                <ul class="chips"><li v-for="chip in slide.chips" :key="chip[0]"><b>{{ chip[0] }}</b> · {{ chip[1] }}</li></ul>
              </div>
              <div class="browser"><div class="bar" aria-hidden="true"><i></i><i></i><i></i></div><img :src="slide.img" :alt="slide.alt"></div>
            </div>

            <template v-else>
              <h2>{{ slide.title }}</h2>

              <!-- context -->
              <template v-if="slide.type === 'context'">
                <p class="callout">{{ slide.callout }}</p>
                <ul class="grid g4">
                  <li v-for="(card, k) in slide.cards" :key="k" class="d"><span class="ctag" :class="`ctag-${card.tag}`">{{ $t(`cs.tags.${card.tag}`) }}</span><h3>{{ card.title }}</h3><p>{{ card.text }}</p></li>
                </ul>
              </template>

              <!-- decisions -->
              <ol v-else-if="slide.type === 'decisions'" class="grid" :class="`g${slide.items.length}`">
                <li v-for="(item, k) in slide.items" :key="k" class="d" :class="{ on: k === 0 }"><span class="n grad">{{ pad(k + 1) }}</span><h3>{{ item.title }}</h3><p>{{ item.why }}</p></li>
              </ol>

              <!-- V1 / V2 -->
              <figure v-else-if="slide.type === 'pair'">
                <div class="ba">
                  <div><b>{{ $t('case.evoBefore') }}</b><img :src="slide.before" :alt="slide.altBefore"></div>
                  <div class="v2"><b>{{ $t('case.evoAfter') }}</b><img :src="slide.after" :alt="slide.altAfter"></div>
                </div>
                <figcaption class="cap">{{ slide.caption }}</figcaption>
              </figure>

              <!-- steps -->
              <ol v-else-if="slide.type === 'steps'" class="grid g3">
                <li v-for="(step, k) in slide.steps" :key="k" class="d">
                  <span class="k">{{ $t('cs.step', { n: k + 1 }) }}</span><h3>{{ step.title }}</h3><p>{{ step.text }}</p>
                  <span v-if="(step.figs && step.figs.length) || (step.tags && step.tags.length)" class="fig"><span v-for="fig in step.figs" :key="fig[1]"><strong>{{ fig[0] }}</strong> {{ fig[1] }}</span><span v-for="tag in step.tags" :key="tag">{{ tag }}</span></span>
                </li>
              </ol>

              <!-- questions + image -->
              <div v-else-if="slide.type === 'questions'" class="qwrap">
                <ol class="qflow"><li v-for="(q, k) in slide.questions" :key="k"><b>{{ pad(k + 1) }}</b>{{ q }}</li></ol>
                <figure><div class="browser"><div class="bar" aria-hidden="true"><i></i><i></i><i></i></div><img :src="slide.img" :alt="slide.alt"></div><figcaption class="cap">{{ slide.caption }}</figcaption></figure>
              </div>

              <!-- screens -->
              <ul v-else-if="slide.type === 'screens'" class="grid g3 shots">
                <li v-for="img in slide.images" :key="img.src"><img :src="img.src" :alt="img.title"><span>{{ img.title }}</span></li>
              </ul>

              <!-- method -->
              <ol v-else-if="slide.type === 'how'" class="grid g4">
                <li v-for="(step, k) in slide.steps" :key="k" class="d"><span class="k">{{ pad(k + 1) }}</span><h3>{{ step.title }}</h3><p>{{ step.text }}</p></li>
              </ol>

              <!-- result -->
              <div v-else-if="slide.type === 'result'">
                <ul v-if="slide.metrics" class="grid g3">
                  <li v-for="(m, k) in slide.metrics" :key="k" class="m"><strong>{{ m[0] }}</strong><span>{{ m[1] }}</span></li>
                </ul>
                <figure v-else class="quote"><blockquote>{{ slide.quote[0] }}<span class="grad">{{ slide.quote[1] }}</span>{{ slide.quote[2] }}</blockquote><figcaption>{{ slide.author }}</figcaption></figure>
                <p class="retro"><b>{{ $t('cs.retro') }}</b>{{ slide.retro }}</p>
              </div>
            </template>
          </div>
        </template>
      </div>

      <button type="button" class="arrow r" :disabled="current === slides.length - 1" :aria-label="$t('cs.next')" @click="go(1)">→</button>
    </div>

    <div class="foot">
      <span class="count">{{ current + 1 }} / {{ slides.length }}</span>
      <div class="dots">
        <button v-for="(slide, i) in slides" :key="i" type="button" :class="{ done: i < current, cur: i === current }" :aria-label="`${i + 1} / ${slides.length} · ${slide.label}`" @click="current = i"></button>
      </div>
      <span class="keys" aria-hidden="true">{{ $t('cs.keysA') }} <kbd>←</kbd><kbd>→</kbd> · <kbd>{{ $t('cs.esc') }}</kbd> {{ $t('cs.keysB') }}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
export default {
  name: 'PresentationDeck',
  props: {
    name: { type: String, required: true },
    slides: { type: Array, required: true },
  },
  emits: ['close'],
  data() {
    return { current: 0, touchX: null, lastFocus: null }
  },
  mounted() {
    this.lastFocus = document.activeElement
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', this.onKey)
    this.$nextTick(() => this.$refs.close && this.$refs.close.focus())
  },
  beforeDestroy() {
    document.documentElement.style.overflow = ''
    window.removeEventListener('keydown', this.onKey)
    if (this.lastFocus && this.lastFocus.focus) this.lastFocus.focus()
  },
  methods: {
    pad(n) {
      return String(n).padStart(2, '0')
    },
    go(step) {
      this.current = Math.min(this.slides.length - 1, Math.max(0, this.current + step))
    },
    onKey(event) {
      if (event.key === 'Escape') this.$emit('close')
      else if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); this.go(1) }
      else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); this.go(-1) }
      else if (event.key === 'Tab') this.trapFocus(event)
    },
    // Keep keyboard focus inside the presentation
    trapFocus(event) {
      const items = Array.from(this.$el.querySelectorAll('button:not([disabled])'))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    },
    onTouchStart(event) {
      this.touchX = event.changedTouches[0].clientX
    },
    onTouchEnd(event) {
      if (this.touchX === null) return
      const dx = event.changedTouches[0].clientX - this.touchX
      if (Math.abs(dx) > 50) this.go(dx < 0 ? 1 : -1)
      this.touchX = null
    },
  },
}
</script>

<style scoped>
.deck {
  --card: rgba(28, 22, 48, .72); --line: rgba(255, 255, 255, .08); --muted: #CDC9E7; --dim: #8F8AB5; --violet: #A64BEB; --sky: #8FB0FF;
  --grad: linear-gradient(90deg, #B865F2 0%, #A15CEF 50%, #6E8BFF 100%);
  position: fixed; inset: 0; z-index: 1000; display: flex; flex-direction: column;
  background: #0D0B17; color: #fff; font-family: Urbanist, system-ui, sans-serif; -webkit-font-smoothing: antialiased;
}
.deck * { font-family: Urbanist, system-ui, sans-serif; }
.deck::before { content: ""; position: absolute; left: 50%; top: -20%; width: 80vw; height: 70vh; transform: translateX(-50%); background: radial-gradient(closest-side, rgba(149, 53, 215, .3), rgba(110, 139, 255, .08) 55%, transparent); pointer-events: none; }
ol, ul { list-style: none; margin: 0; padding: 0; }
button { font: inherit; color: inherit; cursor: pointer; }
button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.grad { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }

.top { position: relative; display: flex; justify-content: space-between; align-items: center; padding: 22px 40px; font-size: 14px; font-weight: 700; color: var(--dim); }
.t { display: flex; gap: 12px; align-items: center; }
.t b { color: #fff; }
.close { padding: 9px 16px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, .16); background: transparent; color: var(--muted); font-size: 14px; font-weight: 700; }
.close:hover { color: #fff; border-color: rgba(255, 255, 255, .4); }

.stage { position: relative; flex: 1; min-height: 0; display: flex; align-items: center; padding: 0 130px; }
.slide { width: 100%; max-width: 1180px; max-height: 100%; margin: 0 auto; overflow-y: auto; padding: 10px 2px; }
.num { display: flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: var(--sky); }
.num em { font-style: normal; padding: 6px 10px; border-radius: 10px; background: rgba(110, 139, 255, .14); color: #B9CCFF; letter-spacing: .1em; }
h1 { font-size: clamp(36px, 4.6vw, 66px); line-height: 1.04; font-weight: 800; margin-top: 20px; }
h2 { font-size: clamp(26px, 3.2vw, 46px); line-height: 1.1; font-weight: 800; margin-top: 16px; max-width: 980px; }
h3 { font-size: 18px; font-weight: 800; line-height: 1.3; }
.lead { margin-top: 22px; font-size: 20px; line-height: 1.55; color: var(--muted); font-weight: 500; }
.cover { display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px; align-items: center; margin-top: 4px; }
.cover h1 { margin-top: 18px; }
.browser { border-radius: 16px; overflow: hidden; background: #1A1430; border: 1px solid rgba(255, 255, 255, .14); box-shadow: 0 40px 90px rgba(0, 0, 0, .55), 0 0 110px rgba(149, 53, 215, .3); }
.bar { height: 28px; display: flex; align-items: center; gap: 6px; padding: 0 12px; background: rgba(255, 255, 255, .04); }
.bar i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, .18); }
.browser img { display: block; width: 100%; }
.chips { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 26px; }
.chips li { font-size: 14px; font-weight: 700; padding: 8px 14px; border-radius: 999px; border: 1px solid var(--line); background: var(--card); color: var(--muted); }
.chips b { color: #fff; }

.callout { margin-top: 26px; padding: 22px 26px; border-radius: 20px; border-left: 3px solid var(--violet); background: linear-gradient(90deg, rgba(149, 53, 215, .18), rgba(27, 21, 45, .2)); font-size: 20px; line-height: 1.45; font-weight: 700; max-width: 900px; }
.grid { margin-top: 32px; display: grid; gap: 14px; }
.g3 { grid-template-columns: repeat(3, 1fr); }
.g4 { grid-template-columns: repeat(4, 1fr); }
.g5 { grid-template-columns: repeat(5, 1fr); }
.d { padding: 22px 20px; border-radius: 20px; border: 1px solid var(--line); background: var(--card); }
.d.on { border-color: rgba(181, 110, 240, .5); background: linear-gradient(180deg, rgba(149, 53, 215, .28), rgba(28, 22, 48, .7)); }
.d .n { display: block; font-size: 30px; font-weight: 900; line-height: 1; margin-bottom: 14px; }
.d p { margin-top: 10px; font-size: 14px; line-height: 1.5; color: var(--muted); }
.k { display: block; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--sky); margin-bottom: 10px; }
.ctag { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; padding: 5px 10px; border-radius: 8px; margin-bottom: 14px; }
.ctag-frein { background: rgba(181, 110, 240, .16); color: #E2C2FA; }
.ctag-offre, .ctag-besoin { background: rgba(110, 139, 255, .16); color: #B9CCFF; }
.ctag-contrainte { background: rgba(144, 255, 188, .13); color: #AFFFD0; }
.fig { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px; }
.fig span { font-size: 12px; font-weight: 700; padding: 5px 9px; border-radius: 9px; background: rgba(255, 255, 255, .05); border: 1px solid var(--line); color: var(--muted); }
.fig strong { color: #fff; }

figure { margin: 0; }
.ba { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.ba b { display: inline-block; margin-bottom: 12px; font-size: 12px; font-weight: 800; letter-spacing: .16em; padding: 6px 12px; border-radius: 999px; background: rgba(255, 255, 255, .08); }
.ba .v2 b { background: linear-gradient(90deg, rgba(149, 53, 215, .55), rgba(110, 139, 255, .55)); }
.ba img { display: block; width: 100%; max-height: 46vh; object-fit: cover; object-position: top; border-radius: 12px; border: 1px solid rgba(255, 255, 255, .1); }
.ba .v2 img { box-shadow: 0 0 60px rgba(149, 53, 215, .35); }
.cap { margin-top: 16px; font-size: 15px; line-height: 1.5; color: var(--dim); font-style: italic; max-width: 900px; }

.qwrap { margin-top: 28px; display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; }
.qflow { display: grid; gap: 10px; }
.qflow li { padding: 14px 16px; border-radius: 14px; border: 1px solid var(--line); background: var(--card); font-size: 17px; font-weight: 700; }
.qflow b { display: inline-block; width: 30px; font-size: 12px; letter-spacing: .12em; color: var(--sky); }
.qwrap .browser img { max-height: 48vh; object-fit: cover; object-position: top; }

.shots li { display: block; }
.shots img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; border-radius: 12px; border: 1px solid rgba(255, 255, 255, .1); }
.shots span { display: block; margin-top: 8px; font-size: 13px; font-weight: 700; color: var(--muted); }

.m { padding: 28px 24px; border-radius: 22px; border: 1px solid rgba(181, 110, 240, .3); background: radial-gradient(90% 90% at 20% 0%, rgba(149, 53, 215, .28), transparent 70%), var(--card); }
.m strong { display: block; font-size: 58px; font-weight: 900; line-height: 1; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.m span { display: block; margin-top: 10px; font-size: 15px; font-weight: 600; line-height: 1.45; }
.quote { margin-top: 30px; padding: 30px; border-radius: 22px; border: 1px solid rgba(181, 110, 240, .3); background: radial-gradient(90% 120% at 10% 0%, rgba(149, 53, 215, .25), transparent 70%), var(--card); }
.quote blockquote { margin: 0; font-size: 26px; line-height: 1.4; font-weight: 700; }
.quote figcaption { margin-top: 14px; font-size: 14px; font-weight: 700; color: var(--dim); }
.retro { margin-top: 22px; padding: 22px 26px; border-radius: 20px; border: 1px dashed rgba(181, 110, 240, .4); font-size: 18px; line-height: 1.5; font-weight: 600; }
.retro b { display: block; margin-bottom: 8px; font-size: 12px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; color: #C58CF2; }

.arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; font-size: 24px; font-weight: 900; border: 1px solid rgba(181, 110, 240, .45); background: rgba(52, 34, 92, .55); box-shadow: 0 0 30px rgba(149, 53, 215, .35); color: #fff; }
.arrow.l { left: 40px; }
.arrow.r { right: 40px; background: radial-gradient(130% 150% at 85% 80%, #6E8BFF 0%, #9535D7 55%, #8A2FCB 100%); border-color: rgba(200, 190, 255, .55); }
.arrow:disabled { opacity: .3; cursor: default; }

.foot { position: relative; display: flex; align-items: center; gap: 24px; padding: 20px 40px 26px; }
.count { font-size: 14px; font-weight: 800; color: var(--muted); white-space: nowrap; }
.dots { display: flex; gap: 8px; flex: 1; }
.dots button { flex: 1; height: 14px; padding: 5px 0; border: 0; background: rgba(255, 255, 255, .12); background-clip: content-box; border-radius: 4px; }
.dots button.done { background-color: rgba(166, 75, 235, .6); }
.dots button.cur { background-image: var(--grad); box-shadow: 0 0 12px rgba(149, 53, 215, .8); }
.keys { font-size: 13px; font-weight: 600; color: var(--dim); white-space: nowrap; }
kbd { font-family: inherit; font-weight: 800; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, .2); color: #fff; margin: 0 2px; }

@media (max-width: 1100px) {
  .g5 { grid-template-columns: repeat(3, 1fr); }
  .g4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 760px) {
  .top { padding: 14px 18px; }
  .t span { display: none; }
  .close { font-size: 13px; padding: 8px 12px; }
  .stage { padding: 0 18px 84px; align-items: flex-start; }
  .slide { padding-top: 6px; }
  .cover, .qwrap { grid-template-columns: 1fr; gap: 22px; }
  .lead { font-size: 16px; margin-top: 14px; }
  .chips li { font-size: 12px; padding: 6px 10px; }
  .callout { font-size: 16px; padding: 16px 18px; }
  .grid, .g3, .g4, .g5 { grid-template-columns: 1fr; gap: 8px; margin-top: 18px; }
  .d { padding: 12px 14px; }
  .d .n { display: inline; font-size: 20px; margin: 0 10px 0 0; }
  .d h3 { display: inline; font-size: 15px; }
  .d p { font-size: 13px; margin-top: 6px; }
  .ba { grid-template-columns: 1fr; gap: 14px; margin-top: 18px; }
  .ba img { max-height: 30vh; }
  .m strong { font-size: 40px; }
  .quote blockquote { font-size: 19px; }
  .retro { font-size: 15px; }
  .arrow { top: auto; bottom: 70px; transform: none; width: 52px; height: 52px; }
  .arrow.l { left: 18px; }
  .arrow.r { right: 18px; }
  .foot { padding: 14px 18px 20px; }
  .keys { display: none; }
}
</style>
