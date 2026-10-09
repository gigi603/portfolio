<template>
	<div>
		<div class="w-full bg-purple-full">
			<div class="container mx-auto max-w-7xl">	
				<div class="flex flex-wrap items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					<div class="md:py-20 card-intro px-6" data-aos="zoom-in">
						<h1 class="mt-2 mb-4 text-4xl md:text-6xl font-bold leading-normal">
						Hi, I'm <br>Gilbert Trinidad
						</h1>
						<h2 class="py-5 font-bold text-4xl md:text-5xl" style="color: #9535D8">Freelance Product Designer</h2>
						<p class="py-5 text-base" style="color: #383a3c">I design clear, warm websites for coaches, therapists and small businesses, so their clients understand the offer and book in a few clicks.</p>
						<a href="#contact" class="inline-block text-center text-white text-base font-bold px-6 py-4 mt-6 w-full md:w-auto rounded-full hover:opacity-75" style="background-color: #9535d7;">Let's talk about your project</a>
					</div>
					<div class="card-intro px-6 py-10" data-aos="zoom-in">
						<div class="hero-mockup">
							<img src="@/assets/images/projects/SPCoach/SPCoach.png" alt="SPCoach website, desktop and mobile" class="hero-mockup-desktop rounded-2xl shadow-2xl object-cover object-top"/>
							<img src="@/assets/images/projects/SPCoach/SPCoach-mobile.png" alt="" class="hero-mockup-mobile rounded-2xl shadow-2xl object-cover object-top"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full bg-purple-full">
			<div class="container mx-auto max-w-7xl pt-10 md:pt-10 px-6">
				<h2 class="py-8 text-black text-3xl font-bold w-full" id="projects">Selected work</h2>
				<div class="flex gap-6 mx-auto grid grid-cols-1 md:grid-cols-2 pb-10 w-full">
					<div v-for="(project, index) in projects" :key="index" :class="project.name" class="rounded-3xl border-color-card overflow-hidden bg-white shadow-lg" @click="redirectToProjectPage(project.id)" data-aos="zoom-in">
						<router-link :to="{ name:'ProjectDetailComponent', params:{ id: project.id } }">
							<img :src="project.img" class="mx-auto w-full h-72 md:h-96"/>
							<div class="px-10 md:px-20 flex w-full">
								<div class="w-3/4 py-8">
									<h3 class="font-bold text-3xl text-left">{{project.name}}</h3>
									<p class="text-left pt-2" style="color:#7a7a7a">{{project.hook}}</p>
								</div>
								<button class="w-1/4 flex justify-end items-center">
									<router-link class="w-14 h-14 flex justify-center items-center grid sm:grid-cols-1 justify-center rounded-full bg-black hover:shadow-lg" :to="{ name:'ProjectDetailComponent', params:{ id: project.id } }">
										<img src="@/assets/icons/arrow-right-fill.svg" class="mx-auto w-8 h-8"> 
									</router-link>
								</button>
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full bg-purple-full">
			<div class="container mx-auto max-w-7xl px-6 pb-16">
				<h2 class="py-8 text-black text-3xl font-bold w-full">What I do</h2>
				<div class="flex gap-6 mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-full">
					<div v-for="(skill, index) in skills" :key="index" :class="skill.name" class="rounded-3xl overflow-hidden bg-white shadow-lg">
						<div class="p-8" data-aos="zoom-in">
							<img :src="skill.icon" class="mx-auto w-16 h-16"/>
							<h3 class="font-bold text-3xl text-center py-5">{{skill.name}}</h3>
							<p class="text-center" style="color:#7a7a7a">{{skill.description}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full bg-white">
			<div class="container mx-auto max-w-7xl px-6 pb-16">
				<h2 class="py-8 text-black text-3xl font-bold w-full" id="about">ABOUT</h2>
				<div class="flex flex-col md:flex-row items-center gap-10" data-aos="zoom-in">
					<img src="@/assets/images/gilbert-trinidad-portfolio.png" alt="Gilbert Trinidad" class="about-photo rounded-3xl object-cover"/>
					<div class="text-lg leading-relaxed" style="color: #383a3c">
						<p class="pb-4">I'm Gilbert, a freelance product designer based in France. I work mostly with independent professionals and small businesses who need a site that feels like them and actually brings in clients.</p>
						<p>My approach is simple: understand the people you want to reach, make the offer easy to grasp, and remove everything that slows down the decision. Because I also code, I can take a project from the first sketch to a live website.</p>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="w-full bg-purple-full">
			<div class="container mx-auto max-w-7xl pb-10 px-6">
				<h2 class="py-8 text-black text-3xl font-bold  w-full">TOOLS</h2>
				<div class="mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10 w-full">
					<div v-for="software in softwares" :key="software.name" :class="software.name" class="rounded-3xl border-color-card overflow-hidden bg-white shadow-xl">
						<div class="p-10" data-aos="zoom-in">
							<img :src="software.icon" class="mx-auto w-16 h-16"/>
							<div class="font-bold text-3xl text-center py-5"><h3>{{software.name}}</h3></div>
						</div>
					</div>
				</div> -->
				<!-- <h2 class="py-8 text-black text-3xl font-bold w-full">TRAVAUX</h2>
				<div class="flex flex-row min-w-0 break-words bg-white w-full shadow-lg border-color-card rounded-3xl">
					<div class="px-14 py-14 xs:grid-cols-1 sm:grid-cols-1 w-full flex-auto">
						<div class="slider">
							<VueSlickCarousel v-bind="settings">
								<div v-for="(src, index) in imgs" :key="index" data-aos="zoom-in" class="grid xs:col-span-1 sm:col-span-1">
									<div class="w-80 h-56 grid xs:col-span-1 sm:col-span-1 shadow-md hover:shadow-lg cursor-pointer mx-auto rounded-3xl border-color-card flex justify-center items-center pic" @click="() => showImg(index)">
										<img :src="src" class="h-52 mx-auto"  alt="">
									</div>
								</div>
							</VueSlickCarousel>	
							<vue-easy-lightbox
								:visible="visible"
								:imgs="imgs"
								:index="index"
								@hide="handleHide"
							></vue-easy-lightbox>					
							<div class="pt-12 text-center">
								<button @click="goToPractices()" class="bg-black text-white hover:opacity-75 text-xl px-3 py-3 md:w-2/5 w-1/5 lg:w-1/5 w-full rounded-full m-auto">Consulter</button>
							</div>
						</div>
					</div>
				</div> -->

		<!-- </div>
	</div> -->
</div>
</template>

<script>
import projects from '../db/projects'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


export default {
	name: 'HomeComponent',
	components: { 
		VueSlickCarousel,
	},
	props: {
		icon: {
			type: String,
			default: 'default-icon'
		}
	},
	data: function() {
		return {
			visible: false,
			projects: projects,
			index: 0,
			settings: {
				"dots": true,
				"focusOnSelect": true,
				"infinite": true,
				"speed": 500,
				"slidesToShow": 3,
				"slidesToScroll": 3,
				"touchThreshold": 5,
				"responsive": [
					{
						"breakpoint": 1024,
						"settings": {
							"slidesToShow": 3,
							"slidesToScroll": 3,
							"infinite": true,
							"dots": true
						}
					},
					{
						"breakpoint": 600,
						"settings": {
							"slidesToShow": 2,
							"slidesToScroll": 2,
							"initialSlide": 2
						}
					},
					{
					"breakpoint": 480,
						"settings": {
							"slidesToShow": 1,
							"slidesToScroll": 1
						}
					}
				]
            },
			skills: [
				{ icon:require("@/assets/icons/ux-logo.png"), name: "UX Design", description: "I start with your clients: who they are, what stops them, what they need to decide. Then I structure the journey so the next step is always obvious.", showDetails: true},
				{ icon:require("@/assets/icons/ui-logo.png"), name: "UI Design", description: "Visual identity, design system and interfaces for web and mobile, consistent and easy to read.", showDetails: false},
				{ icon:require("@/assets/icons/dev-logo.png"), name: "Front-end integration", description: "I build what I design with HTML, CSS and Tailwind, so the final site matches the mockups.", showDetails: false},
			],
			imgs: [
				require("@/assets/images/practices/airmusic-september-2021.png"),
				require("@/assets/images/practices/profit-estimation.svg"),
				require("@/assets/images/practices/withdraw-crypto.svg"),
				require("@/assets/images/practices/edit-profile.svg"),
			],
			softwares: [
				{ name: "Figma", icon:require("@/assets/icons/figma_logo.svg")},
				{ name: "Framer", icon:require("@/assets/icons/framer_logo.svg")},
				{ name: "React", icon:require("@/assets/icons/react_logo.svg")},
				{ name: "Tailwind css", icon:require("@/assets/icons/tailwind_logo.svg")}
			],
		}
	},
	methods: {
		redirectToProjectPage(id) {
            // Redirection vers la page du projet avec l'id spécifié
            this.$router.push({ name: 'ProjectDetailComponent', params: { id } });
        },
		toggleDescription(item) {
			item.showDetails = !item.showDetails
			const test = document.getElementsByClassName(item.name)[0]
			console.log('test', test)
			// if(item['showDetails'] == true) {
			// 	document.getElementsByClassName(item.name)[0].style.height = "auto";
			// } else {
			// 	document.getElementsByClassName(item.name)[0].style.height = "300px";
				
			// }
		},
		showImg (index) {
			this.index = index
			this.visible = true
		},
		handleHide () {
			this.visible = false
		},
		goToPractices(){
			this.$router.push('/practices'); 
		},
		next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },

        
	}
  };
</script>

<style>
	@media (min-width: 1280px) {
		.bg-purple {
			background-image: linear-gradient(180deg, transparent  0%, transparent 85%, #FFF 85%, #FFF 100%);
		}
		.bg-purple-full {
			background-color: #eee6ff;
		}
	}
	.card-intro {
		flex-basis:50%;
	}
	.hero-mockup {
		position: relative;
		padding: 0 0 48px 48px;
	}
	.hero-mockup-desktop {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
	}
	.hero-mockup-mobile {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 26%;
		aspect-ratio: 9 / 19;
	}
	.about-photo {
		width: 320px;
		height: 320px;
		max-width: 100%;
		flex-shrink: 0;
	}
	@media (max-width: 915px) { /* Taille écran tablette */
		.card-intro {
			flex-basis: 100%; /* ou flex-basis: calc(100% / 2); */
		}

		.hero-mockup {
			padding: 0;
		}
		.hero-mockup-mobile {
			display: none;
		}
	}
	@media (max-width: 480px) { /* Taille écran mobile */
		.item {
			flex-basis: 100%;
		}
	}
	.image-container {
		height: 700px; /* Définissez la hauteur souhaitée pour votre conteneur */
		overflow: hidden;
	}
	/*  */
	.slick-track{
		position: relative;
		top: 11px !important;
		left: 0;
		display: block;
		transform: translateZ(0);
	}
	.slick-prev,
	.slick-next {
		font-size: 0;
		line-height: 0;
		position: absolute;
		display: block;
		padding: 0;
		-webkit-transform: translate(0, -50%);
		-ms-transform: translate(0, -50%);
		transform: translate(0, -50%);

		cursor: pointer;

		color: transparent;
		border: none;
		outline: none;
		background: transparent;
		}
		.slick-prev:hover,
		.slick-prev:focus,
		.slick-next:hover,
		.slick-next:focus {
		color: transparent;
		outline: none;
		background: transparent;
	}
	.slick-prev:hover:before,
	.slick-prev:focus:before,
	.slick-next:hover:before,
	.slick-next:focus:before {
		opacity: 1;
	}
	.slick-prev.slick-disabled:before,
	.slick-next.slick-disabled:before {
		opacity: 0.25;
	}

	.slick-prev:before,
	.slick-next:before {
		font-family: 'slick';
		font-size: 30px;
		line-height: 0;

		opacity: 0.75;
		color: black;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.slick-prev {
		left: -25px;
	}
	[dir='rtl'] .slick-prev {
		right: -25px;
		left: auto;
	}
	.slick-prev:before {
		content: '←';
	}
	[dir='rtl'] .slick-prev:before {
		content: '→';
	}

	.slick-next {
		right: -15px;
	}
	[dir='rtl'] .slick-next {
		right: auto;
		left: -15px;
	}
	.slick-next:before {
		content: '→';
	}
	[dir='rtl'] .slick-next:before {
		content: '←';
	}

	/* Dots */

	.slick-dots {
		position: absolute;
		display: block;

		width: 100%;
		padding: 0;
		margin-top: 0.5rem;

		list-style: none;

		text-align: center;
	}
	.slick-dots li {
		position: relative;

		display: inline-block;

		width: 20px;
		height: 20px;
		margin: 0 5px;
		padding: 0;

		cursor: pointer;
	}
	.slick-dots li button {
		font-size: 0;
		line-height: 0;

		display: block;

		width: 20px;
		height: 20px;
		padding: 5px;

		cursor: pointer;

		color: transparent;
		border: 0;
		outline: none;
		background: transparent;
	}
	.slick-dots li button:hover,
	.slick-dots li button:focus {
		outline: none;
	}
	.slick-dots li button:hover:before,
	.slick-dots li button:focus:before {
		opacity: 0.25;
		color: black;
	}
	.slick-dots li button:before {
		font-family: 'slick';
		font-size: 12px !important;
		line-height: 12px !important;

		position: absolute;
		top: 0;
		left: 0;

		width: 12px !important;
		height: 12px !important;

		content: '•';
		text-align: center;

		color: #E3E3E3;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.slick-dots li.slick-active button:before {
		opacity: 0.75;
		color: black;
	}
	.slick-list {
		position: relative;
		height: 250px;
		display: block;
		overflow: hidden;
		margin: 0;
		padding: 0;
		transform: translateZ(0);
	}
</style>