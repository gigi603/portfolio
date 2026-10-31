<template>
  <div class="container mx-auto max-w-7xl px-6 project-wrapper">
    <NotFoundComponent v-if="!currentProject"/>
    <template v-for="project in projects">
      <article v-if="project.id == $route.params.id" :key="project.id" class="project-page">
        <h1 class="project-back"><button @click="$router.go(-1)" class="mr-2" :aria-label="$t('case.back')"><font-awesome-icon icon="fa-solid fa-chevron-left" color="#000" size="sm" /></button> {{ project.name }}</h1>
        <div class="project-columns">
          <div class="project-main">
            <p class="project-label">{{ $t(`projects.${project.id}.label`) }}</p>
            <p v-if="project.sections" class="project-tagline">{{ $t(`projects.${project.id}.tagline`) }}</p>
            <!-- Below 1024px the summary sits here, before the sections -->
            <div class="project-mobile-only">
              <div class="side-card">
                <h4>{{ $t('case.atAGlance') }}</h4>
                <dl>
                  <div v-if="$te(`projects.${project.id}.client`, 'en')"><dt>{{ $t('case.clientLabel') }}</dt><dd>{{ $t(`projects.${project.id}.client`) }}</dd></div>
                  <div v-if="$te(`projects.${project.id}.role`, 'en')"><dt>{{ $t('case.roleLabel') }}</dt><dd>{{ $t(`projects.${project.id}.role`) }}</dd></div>
                  <div v-if="$te(`projects.${project.id}.result`, 'en')" class="side-result"><dt>{{ $t('case.resultLabel') }}</dt><dd>{{ $t(`projects.${project.id}.result`) }}</dd></div>
                  <div><dt>{{ $t('case.typeLabel') }}</dt><dd>{{ $t(`projects.${project.id}.type`) }}</dd></div>
                  <div v-if="$te(`projects.${project.id}.tools`, 'en')"><dt>{{ $t('case.toolsLabel') }}</dt><dd class="side-chips"><span v-for="tool in $t(`projects.${project.id}.tools`).split(', ')" :key="tool">{{ tool }}</span></dd></div>
                </dl>
                <a v-if="project.url_website" :href="project.url_website" target="_blank" rel="noopener" class="side-btn side-btn-primary">{{ $t(`projects.${project.id}.visit_label`) }} ↗</a>
              </div>
            </div>
            <template v-if="project.sections">
              <div v-for="section in project.sections" :key="section" :id="`section-${section}`" class="project-section">
                <h3>{{ $t(`case.sections.${section}`) }}</h3>
                <p>{{ $t(`projects.${project.id}.sections.${section}`) }}</p>
              </div>
            </template>
            <p v-else class="project-section-text">{{ $t(`projects.${project.id}.description`) }}</p>
          </div>
          <aside class="project-aside">
            <div class="project-sticky">
            <div class="side-card">
              <h4>{{ $t('case.atAGlance') }}</h4>
              <dl>
                <div v-if="$te(`projects.${project.id}.client`, 'en')"><dt>{{ $t('case.clientLabel') }}</dt><dd>{{ $t(`projects.${project.id}.client`) }}</dd></div>
                <div v-if="$te(`projects.${project.id}.role`, 'en')"><dt>{{ $t('case.roleLabel') }}</dt><dd>{{ $t(`projects.${project.id}.role`) }}</dd></div>
                <div v-if="$te(`projects.${project.id}.result`, 'en')" class="side-result"><dt>{{ $t('case.resultLabel') }}</dt><dd>{{ $t(`projects.${project.id}.result`) }}</dd></div>
                <div><dt>{{ $t('case.typeLabel') }}</dt><dd>{{ $t(`projects.${project.id}.type`) }}</dd></div>
                <div v-if="$te(`projects.${project.id}.tools`, 'en')"><dt>{{ $t('case.toolsLabel') }}</dt><dd class="side-chips"><span v-for="tool in $t(`projects.${project.id}.tools`).split(', ')" :key="tool">{{ tool }}</span></dd></div>
              </dl>
              <a v-if="project.url_website" :href="project.url_website" target="_blank" rel="noopener" class="side-btn side-btn-primary">{{ $t(`projects.${project.id}.visit_label`) }} ↗</a>
            </div>
            <nav v-if="project.sections" class="side-card side-toc" :aria-label="$t('case.contents')">
              <h4>{{ $t('case.contents') }}</h4>
              <a v-for="item in tocItems(project)" :key="item.id" :href="`#${item.id}`" :class="{ active: activeSection === item.id }" @click.prevent="scrollToSection(item.id)"><i></i>{{ item.label }}</a>
            </nav>
            <div v-if="bookingUrl" class="side-contact">
              <b>{{ $t('case.similarTitle') }}</b>
              <p>{{ $t('case.similarText') }}</p>
              <a :href="bookingUrl" target="_blank" rel="noopener" class="side-btn side-btn-white">{{ $t('case.similarCta') }}</a>
            </div>
            </div>
          </aside>
        </div>
            <section class="gallery" id="section-screens">
              <div class="gallery-head">
                <h3>{{ $t('gallery.title') }}</h3>
                <p>{{ $t('gallery.hint') }}</p>
              </div>
              <div class="gallery-panel">
                <div class="gallery-grid">
                  <figure
                    v-for="(img, index) in project.images"
                    :key="img.key"
                    class="gallery-item"
                    :class="{ 'gallery-item-wide': isWide(index, project.images.length), 'gallery-item-mobile': img.device === 'mobile' }"
                    data-aos="fade-up"
                    :data-aos-delay="index * 80"
                  >
                    <button type="button" class="gallery-frame" :aria-label="$t('gallery.open', { title: screenTitle(project, img) })" @click="showImg(index)">
                      <span v-if="img.device !== 'mobile'" class="gallery-bar" aria-hidden="true">
                        <i></i><i></i><i></i>
                        <span>{{ domain(project.url_website) }}</span>
                      </span>
                      <span class="gallery-shot">
                        <img :src="img.src" :alt="screenTitle(project, img)" :loading="index === 0 ? 'eager' : 'lazy'">
                      </span>
                      <span class="gallery-zoom" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4M11 8v6M8 11h6"/></svg>
                      </span>
                    </button>
                    <figcaption>
                      <b><span class="gallery-number">{{ index + 1 }}</span>{{ screenTitle(project, img) }}</b>
                      <span v-if="$te(`projects.${project.id}.screens.${img.key}.caption`, 'en')">{{ $t(`projects.${project.id}.screens.${img.key}.caption`) }}</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </section>
        <section class="case-end">
          <div class="case-contact">
            <b>{{ $t('case.contactTitle') }}</b>
            <p>{{ $t('case.contactText') }}</p>
            <div class="case-btns">
              <router-link :to="{ path: '/', hash: '#contact' }" class="case-btn case-btn-white">{{ $t('about.cta') }}</router-link>
              <a :href="cvUrl" target="_blank" rel="noopener" class="case-btn case-btn-ghost">{{ $t('about.cv') }}</a>
            </div>
          </div>
          <router-link v-if="nextProject(project)" :to="`/project/${nextProject(project).id}`" class="case-next">
            <img :src="nextProject(project).img" alt="">
            <span class="case-next-text">
              <small>{{ $t('case.nextLabel') }}</small>
              <b>{{ nextProject(project).name }}</b>
              <span v-if="$te(`projects.${nextProject(project).id}.hook`, 'en')">{{ $t(`projects.${nextProject(project).id}.hook`) }}</span>
            </span>
            <span class="case-next-arrow" aria-hidden="true">→</span>
          </router-link>
        </section>
        <div class="project-mobile-only project-mobile-contact">
            <div v-if="bookingUrl" class="side-contact">
              <b>{{ $t('case.similarTitle') }}</b>
              <p>{{ $t('case.similarText') }}</p>
              <a :href="bookingUrl" target="_blank" rel="noopener" class="side-btn side-btn-white">{{ $t('case.similarCta') }}</a>
            </div>
        </div>
      </article>
    </template>
      <ScreenViewer :screens="viewerScreens" :index="index" :visible="visible" @hide="handleHide"/>
  </div>
</template>

<script>
// This project runs Vue 2 (beforeDestroy), but the lint config uses Vue 3 rules
/* eslint-disable vue/no-deprecated-destroyed-lifecycle */
  import projects from '../db/projects'
  import { BOOKING_URL } from '../config'
  import ScreenViewer from '../components/ScreenViewer.vue'
  import NotFoundComponent from './NotFoundComponent.vue'

  export default {
    name: 'ProjectDetailComponent',
    components: { ScreenViewer, NotFoundComponent },
    data: function() {
      return {
        id: this.$route.params.id,
        visible: false,
        index: 0,
        projects: projects,
        currentPage: 1,
        bookingUrl: BOOKING_URL,
        activeSection: null,
        scrollFrame: null,
      }
    },
    computed: {
      cvUrl() {
        return this.$i18n.locale === 'en' ? '/files/Gilbert-Trinidad-Resume.pdf' : '/files/Gilbert-Trinidad-CV.pdf'
      },
      currentProject() {
        return projects.find(project => project.id === this.$route.params.id)
      },
      viewerScreens() {
        const project = this.currentProject
        if (!project) return []
        return project.images.map(img => ({
          src: img.src,
          title: this.screenTitle(project, img),
          caption: this.$te(`projects.${project.id}.screens.${img.key}.caption`, 'en') ? this.$t(`projects.${project.id}.screens.${img.key}.caption`) : '',
          device: img.device || 'desktop',
          url: this.domain(project.url_website),
        }))
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
      nextProject(project) {
        const i = projects.findIndex(p => p.id === project.id)
        return projects[(i + 1) % projects.length]
      },
      tocItems(project) {
        const items = project.sections.map(section => ({ id: `section-${section}`, label: this.$t(`case.sections.${section}`) }))
        return items.concat({ id: 'section-screens', label: this.$t('gallery.title') })
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
        if (!this.currentProject || !this.currentProject.sections) return
        const line = window.innerHeight * 0.35
        let active = null
        this.tocItems(this.currentProject).forEach(item => {
          const el = document.getElementById(item.id)
          if (el && el.getBoundingClientRect().top <= line) active = item.id
        })
        this.activeSection = active || this.tocItems(this.currentProject)[0].id
      },
      screenTitle(project, img) {
        return this.$t(`projects.${project.id}.screens.${img.key}.title`)
      },
      domain(url) {
        return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
      },
      // The first screen spans the full width, and so does a last screen left alone on its row
      isWide(index, count) {
        return index === 0 || (index === count - 1 && (count - 1) % 2 === 1)
      },
      showImg (index) {
        this.index = index
        this.visible = true
      },
      handleHide () {
        this.visible = false
      },
      onPageClick(page){
        this.currentPage = page;
        //this.imgs(this.currentPage);
      },
      loadMore() {
        this.currentPage += 1
      }
    }
  }
</script>
<style scoped>
  .project-wrapper {
    padding-top: 32px;
    padding-bottom: 80px;
  }
  .project-page {
    background: #fff;
    border-radius: 32px;
    box-shadow: 0 24px 60px rgba(61, 22, 87, 0.1);
    padding: 48px 56px 64px;
  }
  .project-back {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 28px;
  }
  .project-columns {
    display: grid;
    grid-template-columns: minmax(0, 680px) 320px;
    justify-content: space-between;
    gap: 64px;
  }
  .project-label {
    color: #9535d8;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .project-tagline {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.35;
    margin-bottom: 30px;
  }
  .project-section {
    margin-bottom: 26px;
  }
  .project-section h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .project-section p {
    white-space: pre-line;
  }
  .project-section p,
  .project-section-text {
    font-size: 16px;
    line-height: 1.75;
    color: #383a3c;
  }
  .project-sticky {
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .side-card {
    border: 1px solid #ece2f8;
    border-radius: 24px;
    padding: 24px;
    background: #fbf8ff;
  }
  .side-card h4 {
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #7b2cb8;
    font-weight: 600;
    margin-bottom: 14px;
  }
  .side-card dl > div {
    padding: 10px 0;
    border-top: 1px solid #f3ecfb;
  }
  .side-card dl > div:first-child {
    border-top: 0;
    padding-top: 0;
  }
  .side-card dt {
    font-size: 12.5px;
    color: #8a8a8a;
  }
  .side-card dd {
    font-size: 14.5px;
    font-weight: 500;
    margin-top: 2px;
  }
  .side-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .side-chips span {
    background: #f3e8ff;
    color: #7b2cb8;
    border-radius: 9999px;
    padding: 3px 10px;
    font-size: 12.5px;
  }
  .side-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    padding: 12px;
    font-weight: 600;
    font-size: 14.5px;
    margin-top: 18px;
    transition: opacity 150ms ease;
  }
  .side-btn:hover {
    opacity: 0.85;
  }
  .side-btn-primary {
    background: #9535d7;
    color: #fff;
    box-shadow: 0 10px 24px rgba(149, 53, 215, 0.28);
  }
  .side-toc a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 0;
    font-size: 14.5px;
    color: #777;
  }
  .side-toc a i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #e2d4f3;
    flex-shrink: 0;
  }
  .side-toc a.active {
    color: #111;
    font-weight: 600;
  }
  .side-toc a.active i {
    background: #9535d7;
    box-shadow: 0 0 0 4px #f0e3ff;
  }
  .side-contact {
    border-radius: 24px;
    padding: 24px;
    background: linear-gradient(150deg, #9535d7, #b46be6 60%, #e09bd0);
    color: #fff;
    box-shadow: 0 18px 36px rgba(149, 53, 215, 0.28);
  }
  .side-contact b {
    display: block;
    font-size: 17px;
    margin-bottom: 6px;
  }
  .side-contact p {
    font-size: 13.5px;
    line-height: 1.55;
    opacity: 0.92;
  }
  .side-btn-white {
    background: #fff;
    color: #7b2cb8;
    margin-top: 16px;
  }
  .project-mobile-only {
    display: none;
  }
  @media (max-width: 1023px) {
    .project-columns {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .project-aside {
      display: none;
    }
    .project-mobile-only {
      display: block;
      margin-bottom: 28px;
    }
    .project-mobile-contact {
      margin: 32px 0 0;
    }
  }
  @media (max-width: 767px) {
    .project-page {
      border-radius: 24px;
      padding: 24px 20px;
    }
    .project-tagline {
      font-size: 22px;
    }
  }
  .gallery {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .gallery-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 26px;
  }
  .gallery-head h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 28px;
  }
  .gallery-head p {
    font-size: 15px;
    color: #7a7a7a;
  }
  .gallery-panel {
    background: linear-gradient(180deg, #f6efff, #fbf7ff);
    border-radius: 32px;
    padding: 36px;
  }
  .gallery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .gallery-item-wide {
    grid-column: 1 / -1;
  }
  .gallery-frame {
    position: relative;
    display: block;
    width: 100%;
    text-align: left;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 18px 40px rgba(61, 22, 87, 0.12), 0 2px 6px rgba(61, 22, 87, 0.06);
    cursor: zoom-in;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .gallery-bar {
    height: 30px;
    background: #f4f1f8;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px;
    border-bottom: 1px solid #ece4f6;
  }
  .gallery-bar i {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #dccbf0;
  }
  .gallery-bar span {
    margin-left: 12px;
    flex: 1;
    max-width: 260px;
    height: 16px;
    border-radius: 8px;
    background: #fff;
    font-size: 9.5px;
    color: #9a8fb0;
    display: flex;
    align-items: center;
    padding-left: 9px;
  }
  .gallery-shot {
    display: block;
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }
  .gallery-item-wide .gallery-shot {
    aspect-ratio: 16 / 8.2;
  }
  .gallery-shot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
    transition: transform 0.5s ease;
  }
  .gallery-item-mobile .gallery-frame {
    max-width: 260px;
    margin: 0 auto;
    border-radius: 28px;
    border: 8px solid #1f1a2b;
  }
  .gallery-item-mobile .gallery-shot {
    aspect-ratio: 9 / 19.5;
  }
  .gallery-zoom {
    position: absolute;
    right: 14px;
    bottom: 14px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #9535d7;
    display: grid;
    place-items: center;
    opacity: 0;
    box-shadow: 0 8px 18px rgba(149, 53, 215, 0.35);
    transition: opacity 0.3s ease;
  }
  .gallery-frame:hover,
  .gallery-frame:focus-visible {
    transform: translateY(-6px);
    box-shadow: 0 28px 56px rgba(61, 22, 87, 0.2);
  }
  .gallery-frame:hover img,
  .gallery-frame:focus-visible img {
    transform: scale(1.04);
  }
  .gallery-frame:hover .gallery-zoom,
  .gallery-frame:focus-visible .gallery-zoom {
    opacity: 1;
  }
  .gallery-item figcaption {
    margin-top: 14px;
    padding: 0 4px;
  }
  .gallery-item-mobile figcaption {
    text-align: center;
  }
  .gallery-item figcaption b {
    display: block;
    font-size: 15px;
    font-weight: 600;
  }
  .gallery-item figcaption > span {
    font-size: 13.5px;
    color: #7a7a7a;
  }
  .gallery-number {
    display: inline-grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #9535d7;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    margin-right: 8px;
    vertical-align: 1px;
  }
  @media (max-width: 767px) {
    .gallery-head {
      flex-direction: column;
      align-items: flex-start;
    }
    .gallery-panel {
      padding: 20px;
    }
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .gallery-frame,
    .gallery-shot img {
      transition: none;
    }
    .gallery-frame:hover,
    .gallery-frame:focus-visible {
      transform: none;
    }
    .gallery-frame:hover img,
    .gallery-frame:focus-visible img {
      transform: none;
    }
  }
  .item {
    flex-basis: 30.33%
  }

  @media (max-width: 915px) { /* Taille écran tablette */
  .item {
    flex-basis: 44%; /* ou flex-basis: calc(100% / 2); */
  }
}

@media (max-width: 480px) { /* Taille écran mobile */
  .item {
    flex-basis: 100%;
  }
}
  .animated-component.fade-enter-from,
.animated-component.zoom-enter-from {
  transition: none;
}
/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Zoom animation */
.zoom-enter-active,
.zoom-leave-active {
  transition: transform 300ms ease;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.9);
}

  /* Fin d'étude de cas : contact + projet suivant */
  .side-result dd { color: #9535d7; font-weight: 600; }
  .case-end { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 56px; }
  .case-contact { background: linear-gradient(135deg, #9535d7, #b46be6); color: #fff; border-radius: 28px; padding: 32px; box-shadow: 0 18px 40px rgba(149, 53, 215, .25); }
  .case-contact b { display: block; font-family: Montserrat, sans-serif; font-size: 24px; margin-bottom: 8px; }
  .case-contact p { margin: 0 0 22px; opacity: .92; line-height: 1.6; }
  .case-btns { display: flex; flex-wrap: wrap; gap: 12px; }
  .case-btn { display: inline-block; border-radius: 999px; padding: 12px 22px; font-weight: 600; font-size: 15px; transition: transform .2s; }
  .case-btn:hover { transform: translateY(-2px); }
  .case-btn-white { background: #fff; color: #9535d7; }
  .case-btn-ghost { border: 2px solid rgba(255,255,255,.7); color: #fff; }
  .case-next { display: grid; grid-template-columns: 140px 1fr auto; align-items: center; gap: 20px; background: #fff; border-radius: 28px; padding: 20px; box-shadow: 0 18px 40px rgba(149, 53, 215, .12); color: #1f1f2e; transition: transform .2s, box-shadow .2s; }
  .case-next:hover { transform: translateY(-3px); box-shadow: 0 22px 48px rgba(149, 53, 215, .2); }
  .case-next img { width: 140px; height: 140px; object-fit: cover; border-radius: 20px; }
  .case-next-text small { display: block; color: #9535d7; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; margin-bottom: 6px; }
  .case-next-text b { display: block; font-family: Montserrat, sans-serif; font-size: 22px; margin-bottom: 6px; }
  .case-next-text span { color: #5b5b6b; font-size: 14px; line-height: 1.5; }
  .case-next-arrow { width: 48px; height: 48px; border-radius: 50%; background: #f3e8fc; color: #9535d7; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  @media (max-width: 900px) {
    .case-end { grid-template-columns: 1fr; margin-top: 40px; }
    .case-contact { padding: 26px; }
    .case-next { grid-template-columns: 88px 1fr auto; gap: 14px; padding: 14px; }
    .case-next img { width: 88px; height: 88px; border-radius: 16px; }
    .case-next-text b { font-size: 18px; }
    .case-next-arrow { width: 40px; height: 40px; }
  }
</style>