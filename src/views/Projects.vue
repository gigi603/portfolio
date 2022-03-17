<template>
    <div class="container mx-auto px-4">
        <div class="flex flex-row px-4">
            <div class="bg-white w-full mb-8 shadow-lg rounded-3xl">
                <div class="py-10" style="padding-left: 4.5rem;"><h2 class="font-bold text-2xl">PROJECTS</h2></div>
                <div class="mb-10">
                    <div v-for="(project, index) in projects" :key="index" class="align-middle" data-aos="fade-in">  
                        <router-link class="px-14 py-10 mb-6 grid sm:grid-cols-1 justify-center project-list rounded-3xl hover:shadow-lg" style="margin-left:4.5rem;margin-right:4.5rem;" :to="{ name:'ProjectPage', params:{ id: project.id } }">
                            <span class="font-bold text-2xl">{{project.name}}<!--<button class="bg-black hover:opacity-75 text-white text-xl px-3 py-3 ml-0 rounded-full float-right">See this project</button>--></span>
                        </router-link>
                    </div>
                    <!-- <div class="px-20 pb-10 grid grid-cols-1 flex-auto">
                        <Pagination :current="currentPage" :total="total" :per-page="perPage" :key="index" @page-changed="currentPage = $event"/>
                    </div> -->
                </div>
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
</style>