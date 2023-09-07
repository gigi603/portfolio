<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap px-4">
      <div class="flex flex-col min-w-0 break-words bg-white drop-shadow-xl w-full my-20 shadow-lg rounded-3xl">
      <div v-for="(project, index) in projects" :key="index" class="relative flex min-w-0 break-words bg-white w-full shadow-lg rounded-3xl">
        <div v-if="project.id == $route.params.id ">
          <div class="pt-10 pl-4 md:pl-20"><h2 class="font-bold text-2xl"><button @click="$router.go(-1)" class="mr-2"><font-awesome-icon icon="fa-solid fa-chevron-left" color="#000" size="sm" /></button> {{ project.name }} </h2></div>
          <div class="md:px-16 py-10 rounded-3xl">
            <p class="px-6">{{ project.description }}
                <span v-if="project.url_website != ''"> Lien du site: <button><a :href=project.url_website target="_blank" class="font-bold text-black" >{{ project.name }}</a></button></span>
              </p>
            <div class="py-10 flex flex-wrap">
                <div v-for="(img, index) in imgs" :key="index" @click="() => showImg(index)" data-aos="zoom-in" class="item md:h-80 shadow-md hover:shadow-lg cursor-pointer mx-4 my-4 rounded-3xl border-color-card flex justify-center items-center">
                  <img :src="img" class="h-48 mx-auto" style="max-width:15rem;"  alt="">
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <vue-easy-lightbox 
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </div>
  </div>
</template>

<script>
  import projects from '../db/projects'

  export default {
    name: 'ProjectPage',
    data: function() {
      return {
        id: this.$route.params.id,
        visible: false,
        index: 0,
        projects: projects,
        imgs: this.imgs
      }
    },
    created: function(){
      let imgs = []
      let imgsObjects = projects.filter(project => project.id === this.id).map(project => project.images);
      imgsObjects.forEach(project => { project.map(function(img){
        imgs.push(img.src);
      })})
      this.imgs = imgs
    },
    methods: {
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