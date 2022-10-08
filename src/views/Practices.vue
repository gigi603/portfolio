<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap px-4">
      <div class="flex flex-col min-w-0 break-words bg-white drop-shadow-xl w-full mb-8 shadow-lg rounded-3xl">
        <div class="py-10 pl-12" style="padding-left: 4.5rem;"><h2 class="font-bold text-2xl">PRACTICES</h2></div>
        <div class="md:px-14 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-auto">
          <div v-for="(img, index) in paginatedOrders" :key="index" @click="() => showImg(((currentPage - 1) * perPage) + index)" data-aos="zoom-in" data-aos-once="false" class="w-60 h-48 mb-10 mx-auto shadow-md hover:shadow-lg cursor-pointer rounded-3xl border-color-card flex justify-center items-center">
            <img :src="img" class="max-h-32 mx-auto"  alt="" >
          </div>
          <vue-easy-lightbox 
            :visible="visible"
            :imgs="imgs"
            :index="index"
            @hide="handleHide"
          ></vue-easy-lightbox>
        </div>
        <div class="px-20 pb-10 grid grid-cols-1 flex-auto">
          <Pagination :current="currentPage" :total="total" :per-page="perPage" :key="index" @page-changed="currentPage = $event"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import '@ocrv/vue-tailwind-pagination/dist/style.css'
import Pagination from '../components/Pagination.vue'

export default {
    name: 'Practices',
    components: {
        Pagination
    },
    data: function() {
        return {
            visible: false,
            index: 0,
            imgs: [
                require("@/assets/images/practices/project-estimate.svg"),
                require("@/assets/images/practices/airmusic-september-2021.png"),
                require("@/assets/images/practices/profit-estimation.svg"),
                require("@/assets/images/practices/withdraw-crypto.svg"),
                require("@/assets/images/practices/edit-profile.svg"), 
                require("@/assets/images/practices/edit-text.svg"),
                require("@/assets/images/practices/download.svg"),
                require("@/assets/images/practices/navbar.svg"),
                require("@/assets/images/practices/playlist-music.svg"),
                require("@/assets/images/practices/forfait.svg"),
                require("@/assets/images/practices/landing-page.svg"),
                require("@/assets/images/practices/card.svg"),
                require("@/assets/images/practices/cryptowall-intro.svg"),
                require("@/assets/images/practices/accueil-reserver.svg"),
            ],
            currentPage: 1,
            perPage: 12,
            total: 20
        }
	},
    computed: {
        totalResults() {
            return Object.keys(this.imgs).length
        },
        pageCount() {
            return Math.ceil(this.totalResults / this.perPage)
        },
        paginatedOrders() {
            return this.imgs.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        }
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
        },
        loadMore() {
            this.currentPage += 1
        }
  }
}
</script>
<style scoped>
  .project-list {
    background-color: #F4F5F7;
  }
  .cursor-pointer {
      cursor: pointer !important;
  }
</style>