<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap px-4">
      <div class="flex flex-col min-w-0 break-words bg-white drop-shadow-xl w-full my-20 shadow-lg rounded-3xl">
      <div v-for="(project, index) in projects" :key="index" class="relative flex min-w-0 break-words bg-white w-full shadow-lg rounded-3xl">
        <div v-if="project.id == $route.params.id ">
          <div class="pt-10 pl-4 md:pl-20"><h2 class="font-bold text-2xl"><button @click="$router.go(-1)" class="mr-2"><font-awesome-icon icon="fa-solid fa-chevron-left" color="#000" size="sm" /></button> {{ project.name }} </h2></div>
          <div class="md:px-16 py-10 rounded-3xl">
            <p class="px-6 pb-2 text-sm font-bold uppercase" style="color: #9535d8;">{{ $t(`projects.${project.id}.label`) }}</p>
            <template v-if="project.sections">
              <p class="px-6 pb-6 text-2xl font-bold">{{ $t(`projects.${project.id}.tagline`) }}</p>
              <ul class="px-6 pb-6" style="color:#7a7a7a">
                <li><span class="font-bold text-black">{{ $t('case.client') }}</span> {{ $t(`projects.${project.id}.client`) }}</li>
                <li><span class="font-bold text-black">{{ $t('case.role') }}</span> {{ $t(`projects.${project.id}.role`) }}</li>
                <li><span class="font-bold text-black">{{ $t('case.tools') }}</span> {{ $t(`projects.${project.id}.tools`) }}</li>
              </ul>
              <div v-for="section in project.sections" :key="section" class="px-6 pb-6">
                <h3 class="font-bold text-xl pb-2">{{ $t(`case.sections.${section}`) }}</h3>
                <p>{{ $t(`projects.${project.id}.sections.${section}`) }}</p>
              </div>
            </template>
            <p v-else class="px-6 pb-4">
              {{ $t(`projects.${project.id}.description`) }}
              </p>
              <p v-if="project.url_website != ''" class="px-6 py-4"><a :href="project.url_website" target="_blank" class="font-bold text-white px-4 py-2 rounded-full" style="background-color: #9535d8;">{{ $te(`projects.${project.id}.visit_label`, 'en') ? $t(`projects.${project.id}.visit_label`) : $t('case.goTo', { name: project.name }) }}</a></p>
            <section class="gallery px-6">
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
          </div>
        </div>
      </div>
      </div>
      <vue-easy-lightbox 
        :visible="visible"
        :imgs="lightboxImgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </div>
  </div>
</template>

<script>
  import projects from '../db/projects'

  export default {
    name: 'ProjectDetailComponent',
    data: function() {
      return {
        id: this.$route.params.id,
        visible: false,
        index: 0,
        projects: projects,
        currentPage: 1,
      }
    },
    computed: {
      currentProject() {
        return projects.find(project => project.id === this.$route.params.id)
      },
      // Titles go with each image so the viewer shows them full screen
      lightboxImgs() {
        if (!this.currentProject) return []
        return this.currentProject.images.map(img => ({ src: img.src, title: this.screenTitle(this.currentProject, img) }))
      },
    },
    methods: {
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
  .gallery {
    padding-top: 24px;
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
</style>