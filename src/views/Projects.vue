<template>
    
    <div class="container mx-auto max-w-7xl competences-bloc py-10 px-6">
        <h2 class="py-8 text-black text-3xl font-bold w-full" id="projects">PROJETS</h2>
        <div class="flex gap-6 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full mb-10 z-10"> 
            <div v-for="(project, index) in projects" :key="index" :class="project.name" @click="redirectToProjectPage(project.id)" class="rounded-3xl border-color-card overflow-hidden bg-white shadow-lg" data-aos="zoom-in">
                <router-link :to="{ name:'ProjectPage', params:{ id: project.id } }">
                <img :src="project.img" class="mx-auto w-full h-72 md:h-96"/>
                <div class="px-10 md:px-20 flex w-full">
                    <h3 class="font-bold text-3xl text-left w-1/2 py-10">{{project.name}}</h3>
                    <button class="w-1/2 flex justify-end items-center">
                        <router-link class="w-14 h-14 flex justify-center items-center sm:grid-cols-1 justify-center rounded-full bg-black hover:shadow-lg" :to="{ name:'ProjectPage', params:{ id: project.id } }">
                            <img src="@/assets/icons/arrow-right-fill.svg" class="mx-auto w-8 h-8"> 
                        </router-link>
                    </button>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import '@ocrv/vue-tailwind-pagination/dist/style.css'
// import Pagination from '../components/Pagination.vue'
import projects from '../db/projects'

export default {
  name: 'Work',
  components: {
    // Pagination
  },
  data: function() {
		return {
            visible: false,
			index: 0,
            projects: projects,
            currentPage: 1,
            perPage: 12,
            total: 1
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
        redirectToProjectPage(id) {
            // Redirection vers la page du projet avec l'id spécifié
            this.$router.push({ name: 'ProjectPage', params: { id } });
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
        },
        loadMore() {
            this.currentPage += 1
        }
    }
}
</script>