<template>
<div class="container mx-auto max-w-7xl competences-bloc py-10 px-6">
        <h2 class="py-8 text-black text-3xl font-bold w-full" id="projects">{{ $t('work.title') }}</h2>
        <p v-if="$te('work.intro', 'en')" class="pb-8" style="font-size: 17px; color: #5b5b66;">{{ $t('work.intro') }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project" data-aos="zoom-in"/>
        </div>
    </div>
</template>

<script>
import projects from '../db/projects'
import ProjectCard from '../components/ProjectCard.vue'

export default {
  name: 'ProjectsComponent',
    // eslint-disable-next-line vue/multiline-html-element-content-newline
  components: {
    ProjectCard,
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
            this.$router.push({ name: 'ProjectDetailComponent', params: { id } });
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