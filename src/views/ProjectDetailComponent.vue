<template>
  <div class="cs-page">
    <NotFoundComponent v-if="!project"/>
    <article v-else :key="project.id" class="cs">
      <!-- Contents rail, large screens only -->
      <nav class="cs-toc" :aria-label="$t('cs.contents')">
        <div class="cs-toc-in">
          <a v-for="(item, i) in tocItems" :key="item.id" :href="`#${item.id}`" :class="{ on: activeSection === item.id }" @click.prevent="scrollToSection(item.id)"><b>{{ pad(i) }}</b>{{ item.label }}</a>
          <a v-if="project.demo" :href="project.demo.path" class="btn btn-big toc-demo">{{ $t('demo.cta') }} →</a>
        </div>
      </nav>

      <div class="cs-main">
        <!-- HEADER -->
        <header id="cs-overview" class="cs-top">
          <router-link :to="{ path: '/', hash: '#projects' }" class="cs-back">← {{ $t('cs.back') }}</router-link>
          <p class="cs-lbl"><i aria-hidden="true"></i>{{ c('label') }}</p>
          <h1>{{ c('title')[0] }}<span class="grad">{{ c('title')[1] }}</span>{{ c('title')[2] }}</h1>
          <p class="cs-intro">{{ c('intro') }}</p>
          <dl class="cs-meta">
            <div v-for="key in metaKeys" :key="key" :class="{ res: key === 'result' }"><dt>{{ $t(`cs.meta.${key}`) }}</dt><dd>{{ c(`meta.${key}`) }}</dd></div>
          </dl>

          <div class="cs-hero">
            <div class="browser">
              <div class="bar" aria-hidden="true"><i></i><i></i><i></i><span>{{ heroUrl }}</span></div>
              <a v-if="project.demo" :href="project.demo.path" class="hero-shot"><img :src="demoShot" :alt="$t('home.demoAlt')" width="1600" height="1000"></a>
              <button v-else type="button" class="hero-shot" :aria-label="$t('gallery.open', { title: screenTitle(project.images[0]) })" @click="showImg(0)">
                <img :src="project.images[0].src" :alt="screenTitle(project.images[0])">
              </button>
            </div>
            <div class="cs-cta">
              <span v-if="project.demo"><b>{{ $t('cs.demoLead') }}</b> · {{ $t('cs.demoSub') }}</span>
              <span v-else><b>{{ $t('cs.siteLead') }}</b> · {{ domain(project.url_website) }}</span>
              <a v-if="project.demo" :href="project.demo.path" class="btn btn-big">{{ $t('demo.cta') }} →</a>
              <a v-else :href="project.url_website" target="_blank" rel="noopener" class="btn btn-big">{{ $t('cs.visit') }} ↗</a>
            </div>
            <p v-if="project.demo" class="cs-disclaimer">{{ $t('demo.disclaimer') }}</p>
          </div>
        </header>

        <!-- 01 CONTEXT -->
        <section id="cs-context" class="cs-sec">
          <p class="num"><em>01</em>{{ $t('cs.context') }}</p>
          <h2>{{ c('context.title') }}</h2>
          <p v-for="(para, i) in c('context.body')" :key="i" class="body">{{ para }}</p>
          <blockquote class="callout">{{ c('context.callout') }}<small>{{ $t('cs.stake') }}</small></blockquote>
          <div class="cards c4">
            <div v-for="(card, i) in c('context.cards')" :key="i" class="cs-card">
              <span class="ctag" :class="`ctag-${card.tag}`">{{ $t(`cs.tags.${card.tag}`) }}</span>
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </div>
          </div>
        </section>

        <!-- 02 DECISIONS -->
        <section id="cs-decisions" class="cs-sec">
          <p class="num"><em>02</em>{{ $t('cs.decisions') }}</p>
          <h2>{{ c('decisions.title') }}</h2>
          <ol class="dec">
            <li v-for="(item, i) in c('decisions.items')" :key="i" class="d">
              <span class="n" aria-hidden="true">{{ pad(i + 1) }}</span>
              <h3>{{ item.title }}</h3>
              <p class="why"><b>{{ $t('cs.why') }}</b>{{ item.why }}</p>
            </li>
          </ol>
        </section>

        <!-- 03 PROJECT SPECIFIC -->
        <section id="cs-third" class="cs-sec">
          <p class="num"><em>03</em>{{ c('third.label') }}</p>
          <h2>{{ c('third.title') }}</h2>
          <p v-if="c('third.body')" class="body">{{ c('third.body') }}</p>
          <ol v-if="c('third.steps')" class="steps3">
            <li v-for="(step, i) in c('third.steps')" :key="i" class="st">
              <p class="k">{{ $t('cs.step', { n: i + 1 }) }}</p>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
              <div v-if="(step.figs && step.figs.length) || (step.tags && step.tags.length)" class="fig">
                <span v-for="fig in step.figs" :key="fig[1]"><strong>{{ fig[0] }}</strong> {{ fig[1] }}</span>
                <span v-for="tag in step.tags" :key="tag">{{ tag }}</span>
              </div>
            </li>
          </ol>
          <ol v-if="c('third.questions')" class="qflow">
            <li v-for="(q, i) in c('third.questions')" :key="i"><b>{{ pad(i + 1) }}</b><span>{{ q }}</span></li>
          </ol>
          <figure v-if="thirdImage" class="big">
            <button type="button" class="browser zoomable" :aria-label="$t('gallery.open', { title: screenTitle(thirdImage) })" @click="showImg(project.images.indexOf(thirdImage))">
              <span class="bar" aria-hidden="true"><i></i><i></i><i></i><span>{{ domain(project.url_website) }}</span></span>
              <img :src="thirdImage.src" :alt="screenTitle(thirdImage)" loading="lazy">
            </button>
            <figcaption>{{ c('third.caption') }}</figcaption>
          </figure>
          <!-- Unfate: V1 next to V2 -->
          <template v-if="project.evolution">
            <figure v-for="pair in project.evolution.pairs" :key="pair.key" class="ba-fig">
              <div class="ba">
                <button type="button" class="side v1" :aria-label="$t('gallery.open', { title: evoTitle(pair.key, 'before') })" @click="showEvo(pair.key, 'before')"><b>{{ $t('case.evoBefore') }}</b><img :src="pair.before" :alt="evoTitle(pair.key, 'before')" loading="lazy"></button>
                <button type="button" class="side v2" :aria-label="$t('gallery.open', { title: evoTitle(pair.key, 'after') })" @click="showEvo(pair.key, 'after')"><b>{{ $t('case.evoAfter') }}</b><img :src="pair.after" :alt="evoTitle(pair.key, 'after')" loading="lazy"></button>
              </div>
              <figcaption><strong>{{ $t(`projects.${project.id}.evolution.${pair.key}.title`) }}.</strong> {{ $t(`projects.${project.id}.evolution.${pair.key}.caption`) }}</figcaption>
            </figure>
          </template>
        </section>

        <!-- 04 SCREENS -->
        <section id="cs-screens" class="cs-sec">
          <p class="num"><em>04</em>{{ c('screens.label') }}</p>
          <h2>{{ c('screens.title') }}</h2>
          <p class="hint">{{ $t('gallery.hint') }}</p>
          <div class="gal">
            <figure v-for="(img, i) in project.images" :key="img.key">
              <button type="button" class="gal-shot" :aria-label="$t('gallery.open', { title: screenTitle(img) })" @click="showImg(i)">
                <img :src="img.src" :alt="screenTitle(img)" loading="lazy">
              </button>
              <figcaption><strong>{{ screenTitle(img) }}</strong><template v-if="$te(`projects.${project.id}.screens.${img.key}.caption`, 'en')"> · {{ $t(`projects.${project.id}.screens.${img.key}.caption`) }}</template></figcaption>
            </figure>
          </div>
        </section>

        <!-- 05 METHOD -->
        <section id="cs-method" class="cs-sec">
          <p class="num"><em>05</em>{{ c('how.label') }}</p>
          <h2>{{ c('how.title') }}</h2>
          <ol class="how">
            <li v-for="(step, i) in c('how.steps')" :key="i"><b>{{ pad(i + 1) }}</b><h3>{{ step.title }}</h3><p>{{ step.text }}</p></li>
          </ol>
        </section>

        <!-- 06 RESULT -->
        <section id="cs-result" class="cs-sec">
          <p class="num"><em>06</em>{{ $t('cs.result') }}</p>
          <h2>{{ c('result.title') }}</h2>
          <template v-if="c('result.metrics')">
            <div class="impact">
              <div v-for="(m, i) in c('result.metrics')" :key="i" class="m"><strong>{{ m[0] }}</strong><span>{{ m[1] }}</span></div>
            </div>
            <p class="note">{{ c('result.note') }}</p>
          </template>
          <template v-else>
            <figure class="quote">
              <blockquote>{{ c('result.quote')[0] }}<span class="grad">{{ c('result.quote')[1] }}</span>{{ c('result.quote')[2] }}</blockquote>
              <figcaption>{{ c('result.author') }}</figcaption>
            </figure>
            <div class="facts">
              <div v-for="(f, i) in c('result.facts')" :key="i" class="fact"><b>{{ f[0] }}</b><span>{{ f[1] }}</span></div>
            </div>
          </template>
          <div class="retro"><b>{{ $t('cs.retro') }}</b><p>{{ $t(`projects.${project.id}.sections.retro`) }}</p></div>
        </section>

        <!-- NEXT + CONTACT -->
        <div class="next">
          <router-link :to="`/project/${next.id}`" class="nx">
            <span class="nx-text">
              <small>{{ $t('case.nextLabel') }}</small>
              <b>{{ displayName(next) }}</b>
              <span>{{ $t(`projects.${next.id}.hook`) }}</span>
              <em>{{ $t('cs.seeProject') }} →</em>
            </span>
            <img :src="next.img" alt="" loading="lazy">
          </router-link>
          <div class="ct">
            <p class="ct-title">{{ $t('cs.contactA') }}<span class="grad">{{ $t('cs.contactB') }}</span></p>
            <p>{{ $t('case.contactText') }}</p>
            <div class="row">
              <router-link :to="{ path: '/', hash: '#contact' }" class="btn btn-big">{{ $t('about.cta') }}</router-link>
              <a :href="cvUrl" download class="btn btn-ghost">{{ $t('about.cv') }}</a>
            </div>
          </div>
        </div>
      </div>
    </article>
    <ScreenViewer :screens="viewerScreens" :index="index" :visible="visible" @hide="handleHide"/>
  </div>
</template>

<script>
// This project runs Vue 2 (beforeDestroy), but the lint config uses Vue 3 rules
/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
import projects from '../db/projects'
import ScreenViewer from '../components/ScreenViewer.vue'
import NotFoundComponent from './NotFoundComponent.vue'

export default {
  name: 'ProjectDetailComponent',
  components: { ScreenViewer, NotFoundComponent },
  data() {
    return {
      visible: false,
      index: 0,
      activeSection: 'cs-overview',
      scrollFrame: null,
      demoShot: require('@/assets/images/neon/unfate-demo.webp'),
      metaKeys: ['role', 'client', 'scope', 'tools', 'type', 'result'],
    }
  },
  computed: {
    project() {
      return projects.find(p => p.id === this.$route.params.id)
    },
    next() {
      const i = projects.findIndex(p => p.id === this.project.id)
      return projects[(i + 1) % projects.length]
    },
    cvUrl() {
      return this.$i18n.locale === 'en' ? '/files/Gilbert-Trinidad-Resume.pdf' : '/files/Gilbert-Trinidad-CV.pdf'
    },
    heroUrl() {
      return this.project.demo ? `gilbert-trinidad.com${this.project.demo.path.replace(/\/$/, '')}` : this.domain(this.project.url_website)
    },
    thirdImage() {
      const key = this.c('third.image')
      return key ? this.project.images.find(img => img.key === key) : null
    },
    tocItems() {
      return [
        ['cs-overview', 'cs.overview'], ['cs-context', 'cs.context'], ['cs-decisions', 'cs.decisions'],
        ['cs-third', null], ['cs-screens', 'cs.screens'], ['cs-method', 'cs.method'], ['cs-result', 'cs.result'],
      ].map(([id, key]) => ({ id, label: key ? this.$t(key) : this.c('third.label') }))
    },
    viewerScreens() {
      if (!this.project) return []
      const screens = this.project.images.map(img => ({
        src: img.src,
        title: this.screenTitle(img),
        caption: this.$te(`projects.${this.project.id}.screens.${img.key}.caption`, 'en') ? this.$t(`projects.${this.project.id}.screens.${img.key}.caption`) : '',
        device: img.device || 'desktop',
        url: this.domain(this.project.url_website),
      }))
      return screens.concat(this.evoScreens())
    },
  },
  watch: {
    '$route.params.id'() {
      this.visible = false
      this.activeSection = 'cs-overview'
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.$nextTick(this.updateActiveSection)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
    cancelAnimationFrame(this.scrollFrame)
  },
  methods: {
    // Case study content of the current project (projects.<id>.cs), in the current language
    c(path) {
      const read = locale => path.split('.').reduce((node, part) => (node == null ? undefined : node[part]),
        (((this.$i18n.messages[locale] || {}).projects || {})[this.project.id] || {}).cs)
      const value = read(this.$i18n.locale)
      return value === undefined ? read('en') : value
    },
    pad(n) {
      return String(n).padStart(2, '0')
    },
    displayName(project) {
      return project.name === 'Melodie Yeremian' ? 'Mélodie Yeremian' : project.name
    },
    screenTitle(img) {
      return this.$t(`projects.${this.project.id}.screens.${img.key}.title`)
    },
    domain(url) {
      return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
    },
    scrollToSection(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    onScroll() {
      cancelAnimationFrame(this.scrollFrame)
      this.scrollFrame = requestAnimationFrame(this.updateActiveSection)
    },
    // The active entry is the last section whose top has passed a line 35% down the viewport
    updateActiveSection() {
      if (!this.project) return
      const line = window.innerHeight * 0.35
      let active = this.tocItems[0].id
      this.tocItems.forEach(item => {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= line) active = item.id
      })
      this.activeSection = active
    },
    // V1/V2 images, appended after the screens in the viewer
    evoScreens() {
      const project = this.project
      if (!project.evolution) return []
      const list = []
      project.evolution.pairs.forEach(pair => {
        ['before', 'after'].forEach(side => list.push({
          id: `${pair.key}-${side}`,
          src: pair[side],
          title: this.evoTitle(pair.key, side),
          caption: this.$t(`projects.${project.id}.evolution.${pair.key}.caption`),
          device: 'desktop',
          url: '',
        }))
      })
      return list
    },
    evoTitle(key, side) {
      return `${this.$t(side === 'before' ? 'case.evoBefore' : 'case.evoAfter')} · ${this.$t(`projects.${this.project.id}.evolution.${key}.title`)}`
    },
    showEvo(key, side) {
      const i = this.evoScreens().findIndex(screen => screen.id === `${key}-${side}`)
      this.showImg(this.project.images.length + i)
    },
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
  },
}
</script>

<style scoped>
.cs-page {
  --bg: #0D0B17; --card: rgba(28, 22, 48, .72); --line: rgba(255, 255, 255, .08);
  --muted: #CDC9E7; --dim: #8F8AB5; --violet: #A64BEB; --lilac: #C58CF2; --sky: #8FB0FF;
  --grad: linear-gradient(90deg, #B865F2 0%, #A15CEF 50%, #6E8BFF 100%);
  background: var(--bg);
  color: #fff;
  font-family: Urbanist, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
  padding-bottom: 40px;
}
.cs-page *, .cs-page h1, .cs-page h2, .cs-page h3, .cs-page p, .cs-page span, .cs-page a, .cs-page li, .cs-page button { font-family: Urbanist, system-ui, sans-serif; }
.grad { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
button { background: none; border: 0; padding: 0; color: inherit; cursor: zoom-in; text-align: left; }
ol { list-style: none; padding: 0; margin: 0; }

.cs { max-width: 1240px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: minmax(0, 1fr); }
@media (min-width: 1280px) {
  .cs { max-width: 1440px; grid-template-columns: 170px minmax(0, 1fr); gap: 56px; }
}

/* contents rail */
.cs-toc { display: none; }
@media (min-width: 1280px) {
  .cs-toc { display: block; }
  .cs-toc-in { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 4px; padding-top: 110px; }
  .cs-toc a { display: flex; gap: 10px; align-items: center; padding: 8px 10px; border-radius: 10px; font-size: 13px; font-weight: 700; color: var(--dim); text-decoration: none; transition: color .2s ease, background .2s ease; }
  .cs-toc a b { font-size: 11px; letter-spacing: .1em; color: var(--dim); }
  .cs-toc a:hover { color: #fff; }
  .cs-toc a.on { background: rgba(149, 53, 215, .18); color: #fff; box-shadow: inset 2px 0 0 var(--violet); }
  .cs-toc a.on b { color: var(--sky); }
  .cs-toc a.toc-demo { margin-top: 18px; justify-content: center; padding: 12px 10px; font-size: 11px; color: #fff; letter-spacing: .06em; }
  .cs-toc a.toc-demo:hover { color: #fff; }
}
.cs-main { min-width: 0; max-width: 1180px; }

/* buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 999px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; font-size: 13px; padding: 12px 22px; border: 1px solid rgba(181, 110, 240, .45); background: rgba(52, 34, 92, .55); color: #fff; white-space: nowrap; text-decoration: none; cursor: pointer; }
.btn-big { font-size: 14px; padding: 15px 26px; border: 1px solid rgba(200, 190, 255, .55); background: radial-gradient(130% 150% at 85% 80%, #6E8BFF 0%, #9535D7 48%, #8A2FCB 100%); box-shadow: inset 0 2px 0 rgba(255, 255, 255, .35), inset 0 -6px 18px rgba(60, 20, 120, .45), 0 10px 50px rgba(79, 107, 255, .3), 0 0 70px rgba(149, 53, 215, .4); }
.btn-ghost { background: transparent; border-color: rgba(255, 255, 255, .18); }
.btn:focus-visible, .cs-page a:focus-visible, .cs-page button:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }

/* header */
.cs-top { position: relative; padding-top: 40px; scroll-margin-top: 110px; }
.cs-top::before { content: ""; position: absolute; left: 50%; top: -180px; width: min(1100px, 100vw); height: 700px; transform: translateX(-50%); background: radial-gradient(closest-side, rgba(149, 53, 215, .35), rgba(110, 139, 255, .1) 55%, transparent); pointer-events: none; }
.cs-back { position: relative; font-size: 14px; font-weight: 700; color: var(--dim); text-decoration: none; }
.cs-back:hover { color: #fff; }
.cs-lbl { position: relative; margin-top: 34px; display: flex; gap: 10px; align-items: center; font-size: 12px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: var(--sky); }
.cs-lbl i { flex: none; width: 7px; height: 7px; border-radius: 2px; background: var(--sky); box-shadow: 0 0 10px var(--sky); }
h1 { position: relative; font-size: 62px; line-height: 1.05; font-weight: 800; margin-top: 18px; letter-spacing: -.01em; max-width: 1000px; }
.cs-intro { position: relative; margin-top: 22px; font-size: 21px; line-height: 1.6; color: var(--muted); font-weight: 500; max-width: 820px; }
.cs-meta { position: relative; margin: 44px 0 0; display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--line); border-radius: 22px; overflow: hidden; background: rgba(27, 21, 45, .55); }
.cs-meta div { padding: 22px 24px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.cs-meta div:nth-child(3n) { border-right: none; }
.cs-meta div:nth-child(n+4) { border-bottom: none; }
.cs-meta dt { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--dim); font-weight: 800; margin-bottom: 8px; }
.cs-meta dd { margin: 0; font-size: 16px; font-weight: 600; line-height: 1.45; color: #EEEAF7; }
.cs-meta .res dd { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 800; }

.cs-hero { position: relative; margin-top: 44px; }
.browser { display: block; width: 100%; border-radius: 18px; overflow: hidden; background: #1A1430; border: 1px solid rgba(255, 255, 255, .14); box-shadow: 0 40px 90px rgba(0, 0, 0, .55), 0 0 120px rgba(149, 53, 215, .3); }
.bar { height: 36px; display: flex; align-items: center; gap: 7px; padding: 0 14px; background: rgba(255, 255, 255, .04); border-bottom: 1px solid rgba(255, 255, 255, .08); }
.bar i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, .18); }
.bar span { margin-left: 14px; font-size: 12px; font-weight: 600; color: var(--dim); background: rgba(0, 0, 0, .25); padding: 4px 14px; border-radius: 8px; }
.browser img, .hero-shot { display: block; width: 100%; }
a.hero-shot img { height: auto; }
.cs-cta { position: relative; z-index: 2; width: max-content; max-width: 100%; margin: -30px auto 0; display: flex; gap: 14px; align-items: center; padding: 10px 10px 10px 24px; border-radius: 999px; background: rgba(13, 11, 23, .9); border: 1px solid rgba(181, 110, 240, .45); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); box-shadow: 0 20px 50px rgba(0, 0, 0, .5); font-size: 15px; font-weight: 600; color: var(--muted); }
.cs-cta b { color: #fff; }
.cs-disclaimer { margin: 18px auto 0; max-width: 760px; text-align: center; font-size: 13px; line-height: 1.55; color: var(--dim); }

/* sections */
.cs-sec { padding-top: 140px; scroll-margin-top: 60px; }
.num { display: flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: var(--sky); }
.num em { font-style: normal; padding: 6px 10px; border-radius: 10px; background: rgba(110, 139, 255, .14); color: #B9CCFF; letter-spacing: .1em; }
h2 { font-size: 42px; line-height: 1.12; font-weight: 800; margin-top: 18px; max-width: 860px; }
.body { margin-top: 22px; font-size: 18px; line-height: 1.7; color: var(--muted); font-weight: 500; max-width: 760px; }
.body + .body { margin-top: 14px; }
.hint { margin-top: 14px; color: var(--dim); font-size: 14px; font-weight: 600; }
.callout { margin: 40px 0 0; padding: 30px 34px; border-radius: 22px; border-left: 3px solid var(--violet); background: linear-gradient(90deg, rgba(149, 53, 215, .18), rgba(27, 21, 45, .2)); font-size: 24px; line-height: 1.45; font-weight: 700; max-width: 900px; }
.callout small { display: block; margin-top: 12px; font-size: 13px; font-weight: 700; color: var(--dim); letter-spacing: .1em; text-transform: uppercase; }

.cards { display: grid; gap: 18px; margin-top: 40px; }
.c4 { grid-template-columns: repeat(4, 1fr); }
.cs-card { padding: 26px 24px 28px; border-radius: 22px; border: 1px solid var(--line); background: var(--card); }
.ctag { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; padding: 5px 10px; border-radius: 8px; margin-bottom: 16px; }
.ctag-frein { background: rgba(181, 110, 240, .16); color: #E2C2FA; }
.ctag-offre, .ctag-besoin { background: rgba(110, 139, 255, .16); color: #B9CCFF; }
.ctag-contrainte { background: rgba(144, 255, 188, .13); color: #AFFFD0; }
.cs-card h3 { font-size: 20px; font-weight: 800; line-height: 1.25; margin-bottom: 8px; }
.cs-card p { font-size: 15px; line-height: 1.55; color: var(--muted); font-weight: 500; }

.dec { margin-top: 44px; display: grid; gap: 16px; }
.d { display: grid; grid-template-columns: 70px 1fr 1.1fr; gap: 28px; align-items: start; padding: 28px 30px; border-radius: 22px; border: 1px solid var(--line); background: var(--card); }
.d .n { font-size: 34px; font-weight: 900; line-height: 1; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.d h3 { font-size: 21px; font-weight: 800; line-height: 1.3; }
.d .why { font-size: 15px; line-height: 1.6; color: var(--muted); font-weight: 500; }
.d .why b { display: block; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: var(--dim); margin-bottom: 6px; }

.steps3 { margin-top: 44px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.st { padding: 28px 26px; border-radius: 22px; border: 1px solid var(--line); background: var(--card); }
.st .k { font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--sky); margin-bottom: 12px; }
.st h3 { font-size: 22px; font-weight: 800; margin-bottom: 10px; }
.st p { font-size: 15px; line-height: 1.6; color: var(--muted); font-weight: 500; }
.st .fig { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 8px; }
.st .fig span { font-size: 13px; font-weight: 700; padding: 6px 10px; border-radius: 10px; background: rgba(255, 255, 255, .05); border: 1px solid var(--line); color: var(--muted); }
.st .fig strong { color: #fff; }

.qflow { margin-top: 44px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.qflow li { padding: 20px 18px; border-radius: 18px; border: 1px solid var(--line); background: var(--card); }
.qflow b { display: block; font-size: 12px; font-weight: 900; letter-spacing: .14em; color: var(--sky); margin-bottom: 10px; }
.qflow span { font-size: 17px; font-weight: 700; line-height: 1.35; }

figure { margin: 40px 0 0; }
figcaption { margin-top: 14px; font-size: 14px; line-height: 1.55; color: var(--dim); font-weight: 500; max-width: 820px; }
figcaption strong { color: var(--muted); }
.big .browser { box-shadow: 0 30px 70px rgba(0, 0, 0, .45); }

.ba-fig { margin-top: 48px; }
.ba { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.ba .side { display: block; width: 100%; }
.ba .side b { display: inline-block; margin-bottom: 12px; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; padding: 6px 12px; border-radius: 999px; }
.ba .v1 b { background: rgba(255, 255, 255, .08); color: var(--muted); }
.ba .v2 b { background: linear-gradient(90deg, rgba(149, 53, 215, .5), rgba(110, 139, 255, .5)); color: #fff; }
.ba img { display: block; width: 100%; border-radius: 14px; border: 1px solid rgba(255, 255, 255, .1); transition: transform .3s ease; }
.ba .v2 img { box-shadow: 0 0 60px rgba(149, 53, 215, .35); }
.ba .side:hover img { transform: translateY(-3px); }

.gal { margin-top: 36px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px 18px; }
.gal figure { margin: 0; }
.gal-shot { display: block; width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255, 255, 255, .1); background: #1A1430; }
.gal-shot img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; transition: transform .3s ease; }
.gal-shot:hover img { transform: scale(1.02); }
.gal figcaption { margin-top: 10px; font-size: 13px; }

.how { margin-top: 44px; display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 22px; overflow: hidden; }
.how li { padding: 28px 24px; border-right: 1px solid var(--line); background: rgba(27, 21, 45, .45); }
.how li:last-child { border-right: none; }
.how b { display: block; font-size: 12px; font-weight: 900; letter-spacing: .16em; color: var(--sky); margin-bottom: 14px; }
.how h3 { font-size: 19px; font-weight: 800; margin-bottom: 8px; }
.how p { font-size: 14.5px; line-height: 1.55; color: var(--muted); font-weight: 500; }

.impact { margin-top: 44px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.m { padding: 34px 28px; border-radius: 24px; border: 1px solid rgba(181, 110, 240, .3); background: radial-gradient(90% 90% at 20% 0%, rgba(149, 53, 215, .28), transparent 70%), var(--card); }
.m strong { display: block; font-size: 64px; font-weight: 900; line-height: 1; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.m span { display: block; margin-top: 12px; font-size: 16px; font-weight: 600; color: #EEEAF7; line-height: 1.45; }
.note { margin-top: 22px; font-size: 14px; color: var(--dim); font-weight: 600; }

.quote { margin-top: 44px; padding: 40px; border-radius: 24px; border: 1px solid rgba(181, 110, 240, .3); background: radial-gradient(90% 120% at 10% 0%, rgba(149, 53, 215, .25), transparent 70%), var(--card); }
.quote blockquote { margin: 0; font-size: 28px; line-height: 1.4; font-weight: 700; max-width: 900px; }
.quote figcaption { margin-top: 18px; font-size: 14px; font-weight: 700; color: var(--dim); letter-spacing: .04em; }
.facts { margin-top: 18px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.fact { padding: 24px; border-radius: 20px; border: 1px solid var(--line); background: var(--card); }
.fact b { display: block; font-size: 20px; font-weight: 800; margin-bottom: 8px; }
.fact span { font-size: 15px; line-height: 1.55; color: var(--muted); font-weight: 500; }

.retro { margin-top: 40px; padding: 34px; border-radius: 24px; border: 1px dashed rgba(181, 110, 240, .4); display: grid; grid-template-columns: 200px 1fr; gap: 30px; align-items: start; }
.retro b { font-size: 12px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; color: var(--lilac); }
.retro p { font-size: 20px; line-height: 1.55; font-weight: 600; }

.next { margin-top: 140px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
.nx { border-radius: 28px; border: 1px solid var(--line); background: var(--card); padding: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; color: #fff; text-decoration: none; transition: border-color .2s ease; }
.nx:hover { border-color: rgba(181, 110, 240, .45); }
.nx-text { display: block; }
.nx small { display: block; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--dim); }
.nx b { display: block; font-size: 30px; font-weight: 800; margin: 10px 0 8px; }
.nx-text > span { display: block; font-size: 15px; line-height: 1.55; color: var(--muted); }
.nx em { display: block; margin-top: 16px; font-style: normal; font-weight: 800; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--lilac); }
.nx img { width: 100%; border-radius: 12px; border: 1px solid rgba(255, 255, 255, .1); }
.ct { border-radius: 28px; padding: 34px; background: radial-gradient(100% 120% at 50% 100%, rgba(149, 53, 215, .45), rgba(110, 139, 255, .12) 60%, transparent), rgba(27, 21, 45, .7); border: 1px solid rgba(181, 110, 240, .3); }
.ct-title { font-size: 28px; font-weight: 800; }
.ct p:not(.ct-title) { margin-top: 10px; color: var(--muted); font-size: 16px; line-height: 1.55; }
.ct .row { margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; }

@media (max-width: 1000px) {
  .c4 { grid-template-columns: 1fr 1fr; }
  .qflow { grid-template-columns: repeat(3, 1fr); }
  .how { grid-template-columns: 1fr 1fr; }
  .how li:nth-child(2n) { border-right: none; }
  .how li:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
  .next { grid-template-columns: 1fr; }
}
@media (max-width: 700px) {
  .cs { padding: 0 20px; }
  .cs-top { padding-top: 24px; }
  h1 { font-size: 38px; }
  .cs-intro { font-size: 17px; }
  .cs-meta { grid-template-columns: 1fr 1fr; }
  .cs-meta div, .cs-meta div:nth-child(3n), .cs-meta div:nth-child(n+4) { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 16px; }
  .cs-meta div:nth-child(2n) { border-right: none; }
  .cs-meta div:nth-child(n+5) { border-bottom: none; }
  .cs-meta dd { font-size: 14px; }
  .bar span { display: none; }
  .cs-cta { width: auto; margin-top: 16px; flex-direction: column; align-items: stretch; text-align: center; font-size: 13px; padding: 16px; border-radius: 22px; }
  .cs-sec { padding-top: 90px; }
  h2 { font-size: 28px; }
  .body { font-size: 16px; }
  .callout { font-size: 19px; padding: 22px; }
  .c4 { gap: 12px; }
  .cs-card { padding: 18px 16px; }
  .cs-card h3 { font-size: 17px; }
  .cs-card p { font-size: 14px; }
  .d { grid-template-columns: 1fr; gap: 10px; padding: 22px; }
  .steps3, .ba, .gal, .impact, .facts, .nx { grid-template-columns: 1fr; }
  .qflow { grid-template-columns: 1fr 1fr; }
  .how { grid-template-columns: 1fr; }
  .how li, .how li:nth-child(2n), .how li:nth-child(-n+2) { border-right: none; border-bottom: 1px solid var(--line); }
  .how li:last-child { border-bottom: none; }
  .m strong { font-size: 52px; }
  .quote { padding: 26px; }
  .quote blockquote { font-size: 21px; }
  .retro { grid-template-columns: 1fr; gap: 12px; padding: 24px; }
  .retro p { font-size: 17px; }
  .next { margin-top: 90px; }
}
@media (prefers-reduced-motion: reduce) {
  .ba img, .gal-shot img { transition: none; }
}
</style>
