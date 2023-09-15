<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap px-4">
      <div class="flex flex-col min-w-0 break-words bg-white drop-shadow-xl w-full my-20 shadow-lg rounded-3xl">
        <div class="py-10 pl-12" style="padding-left: 4.5rem;"><h2 class="font-bold text-3xl">TRAVAUX</h2></div>
        <div class="flex flex-wrap md:px-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(img, index) in paginatedOrders" :key="index" @click="() => showImg(((currentPage - 1) * perPage) + index)" data-aos="zoom-in" data-aos-once="false" class="item md:h-80 mb-10 mx-4 my-4 shadow-md hover:shadow-lg cursor-pointer rounded-3xl border-color-card flex justify-center items-center">
            <img :src="img" class="h-48 mx-auto" style="max-width:15rem;" alt="" >
          </div>
          <vue-easy-lightbox 
            :visible="visible"
            :imgs="imgs"
            :index="index"
            @hide="handleHide"
          ></vue-easy-lightbox>
        </div>
        <div class="md:px-20 md:pb-10 flex justify-center md:justify-end">
          <PaginationComponent :current="currentPage" :total="total" :per-page="perPage" :key="index" @page-changed="currentPage = $event"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import '@ocrv/vue-tailwind-pagination/dist/style.css'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
    name: 'PracticesComponent',
    components: {
        PaginationComponent
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
                require("@/assets/images/practices/forfait.svg"),
                require("@/assets/images/practices/landing-page.svg"),
                require("@/assets/images/practices/card.svg"),
                require("@/assets/images/practices/cryptowall-intro.svg"),
                require("@/assets/images/practices/accueil-reserver.svg"),
            ],
            currentPage: 1,
            perPage: 6,
            total: 13
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
  .cursor-pointer {
      cursor: pointer !important;
  }
</style>