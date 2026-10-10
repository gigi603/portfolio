<template>
	<div>
		<!-- One continuous background behind the navbar, hero, project strip and selected work -->
		<div class="home-bg">
		<div class="home-bg-deco" aria-hidden="true">
			<div class="home-dots"></div>
			<div class="home-glow home-glow-1"></div>
			<div class="home-glow home-glow-2"></div>
			<div class="home-glow home-glow-3"></div>
			<div class="home-glow home-glow-4"></div>
			<div class="home-glow home-glow-5"></div>
			<div class="home-fade"></div>
		</div>
		<section class="hero">
			<div class="hero-bg" aria-hidden="true">
				<div v-for="chip in chips" :key="chip.key" class="hero-chip" :class="chip.position">
					<span class="hero-chip-icon" :style="{ background: chip.color }">{{ chip.icon }}</span>{{ $t(`hero.chips.${chip.key}`) }}
				</div>
			</div>
			<div class="hero-content" data-aos="zoom-in">
				<p class="hero-badge"><i></i>{{ $t('hero.available') }}</p>
				<h1 class="hero-title">{{ $t('hero.h1a') }}<br><em>{{ $t('hero.h1b') }}</em></h1>
				<p class="hero-lead">{{ $t('hero.text') }}</p>
				<div class="hero-buttons">
					<a v-if="bookingUrl" :href="bookingUrl" target="_blank" rel="noopener" class="hero-btn hero-btn-primary">{{ $t('hero.book') }}</a>
					<a href="#contact" class="hero-btn" :class="bookingUrl ? 'hero-btn-outline' : 'hero-btn-primary'">{{ $t('hero.talk') }}</a>
				</div>
				<a href="#testimonials" class="hero-trust">{{ $t('hero.trusted') }}</a>
			</div>
		</section>
		<ProjectStrip/>
		<section class="selected-work" id="projects">
			<div class="container mx-auto max-w-7xl px-6">
				<h2 class="selected-work-title">{{ $t('work.title') }}</h2>
				<p v-if="$te('work.intro', 'en')" class="selected-work-intro">{{ $t('work.intro') }}</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<ProjectCard v-for="project in projects" :key="project.id" :project="project" data-aos="zoom-in"/>
				</div>
			</div>
		</section>
		</div>
		<div class="w-full bg-white">
			<div class="container mx-auto max-w-7xl px-6 pb-16">
				<h2 class="pb-8 text-black text-3xl font-bold w-full" id="testimonials">{{ $t('testimonials.title') }}</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div v-for="testimonial in testimonials" :key="testimonial.name" class="rounded-3xl bg-white shadow-lg p-10 flex flex-col" data-aos="zoom-in">
						<span class="quote-mark" aria-hidden="true">&ldquo;</span>
						<p class="text-lg flex-grow" style="color: #383a3c">{{ $t(`testimonials.${testimonial.key}.quote`) }}</p>
						<p class="font-bold pt-6">{{ testimonial.name }}</p>
						<p style="color:#7a7a7a">{{ $t(`testimonials.${testimonial.key}.job`) }}</p>
						<router-link :to="{ name:'ProjectDetailComponent', params:{ id: testimonial.projectId } }" class="pt-4 text-sm hover:underline" style="color: #9535d7;">{{ $t('testimonials.seeProject') }}</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full bg-purple-full">
			<div class="container mx-auto max-w-7xl px-6 py-16">
				<h2 class="pb-8 text-black text-3xl font-bold w-full">{{ $t('skills.title') }}</h2>
				<div class="flex gap-6 mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-full">
					<div v-for="(skill, index) in skills" :key="index" :class="skill.key" class="rounded-3xl overflow-hidden bg-white shadow-lg">
						<div class="p-8" data-aos="zoom-in">
							<img :src="skill.icon" class="mx-auto w-16 h-16"/>
							<h3 class="font-bold text-3xl text-center py-5">{{ $t(`skills.${skill.key}.name`) }}</h3>
							<p class="text-center" style="color:#7a7a7a">{{ $t(`skills.${skill.key}.description`) }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full bg-white" id="about">
			<div class="container mx-auto max-w-7xl px-6 pb-16">
				<h2 class="py-8 text-black text-3xl font-bold w-full">{{ $t('about.title') }}</h2>
				<div class="flex flex-col md:flex-row items-center gap-10" data-aos="zoom-in">
					<img src="@/assets/images/gilbert-trinidad-portfolio.png" alt="Gilbert Trinidad" class="about-photo rounded-3xl object-cover"/>
					<div class="text-lg leading-relaxed" style="color: #383a3c">
						<p class="pb-4">{{ $t('about.p1') }}</p>
						<p>{{ $t('about.p2') }}</p>
						<a href="/files/Gilbert-Trinidad-CV.pdf" target="_blank" class="inline-block pt-6 font-bold hover:underline" style="color: #9535d7;">{{ $t('about.cv') }}</a>
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
import { BOOKING_URL } from '../config'
import ProjectStrip from '../components/ProjectStrip.vue'
import ProjectCard from '../components/ProjectCard.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


export default {
	name: 'HomeComponent',
	components: { 
		VueSlickCarousel,
		ProjectStrip,
		ProjectCard,
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
			bookingUrl: BOOKING_URL,
			chips: [
				{ key: 'research', icon: '🔍', color: '#f3e8ff', position: 'chip-left-1' },
				{ key: 'wireframes', icon: '✏️', color: '#fce7f3', position: 'chip-left-2' },
				{ key: 'prototyping', icon: '🧩', color: '#ede9fe', position: 'chip-left-3' },
				{ key: 'ui', icon: '🎨', color: '#e0f2fe', position: 'chip-right-1' },
				{ key: 'testing', icon: '🧪', color: '#fef3c7', position: 'chip-right-2' },
				{ key: 'launch', icon: '🚀', color: '#dcfce7', position: 'chip-right-3' },
			],
			testimonials: [
				{ key: 'sophie', projectId: '1', name: 'Sophie Pratt' },
				{ key: 'melodie', projectId: '2', name: 'Mélodie Yeremian' },
			],
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
				{ icon:require("@/assets/icons/ux-logo.png"), key: "ux", showDetails: true},
				{ icon:require("@/assets/icons/ui-logo.png"), key: "ui", showDetails: false},
				{ icon:require("@/assets/icons/dev-logo.png"), key: "dev", showDetails: false},
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
	.hero {
		position: relative;
		padding: 48px 24px 40px;
	}
	.hero-content {
		position: relative;
		max-width: 1040px;
		margin: 0 auto;
		text-align: center;
	}
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #fff;
		border-radius: 9999px;
		padding: 6px 14px;
		font-size: 13px;
		font-weight: 500;
		color: #3d1657;
		margin-bottom: 26px;
	}
	.hero-badge i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #22c55e;
		display: inline-block;
	}
	.hero-title {
		font-family: "Montserrat", sans-serif;
		font-weight: 800;
		font-size: 56px;
		line-height: 1.12;
		letter-spacing: -1px;
		color: #111;
	}
	.hero-title em {
		font-style: normal;
		color: #9535d7;
	}
	.hero-lead {
		font-size: 18px;
		line-height: 1.6;
		color: #383a3c;
		max-width: 640px;
		margin: 22px auto 0;
	}
	.hero-buttons {
		display: flex;
		gap: 14px;
		justify-content: center;
		margin-top: 32px;
	}
	.hero-btn {
		border-radius: 9999px;
		padding: 15px 28px;
		font-size: 15px;
		font-weight: 600;
		transition: opacity 150ms ease;
	}
	.hero-btn:hover {
		opacity: 0.85;
	}
	.hero-btn-primary {
		background: #9535d7;
		color: #fff;
		box-shadow: 0 10px 24px rgba(149, 53, 215, 0.3);
	}
	.hero-btn-outline {
		border: 2px solid #9535d7;
		color: #9535d7;
	}
	.hero-trust {
		display: inline-block;
		margin-top: 18px;
		font-size: 13px;
		color: #7a7a7a;
	}
	.hero-trust:hover {
		text-decoration: underline;
	}
	.hero-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.home-bg {
		position: relative;
		isolation: isolate;
		background: #eee6ff;
		/* Start behind the sticky navbar (16px margin + 64px bar) */
		margin-top: -80px;
		padding-top: 80px;
	}
	.home-bg-deco {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}
	.home-dots {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(149, 53, 215, 0.24) 1.7px, transparent 1.7px);
		background-size: 26px 26px;
		-webkit-mask-image: linear-gradient(90deg, #000 0, #000 22%, transparent 38%, transparent 62%, #000 78%);
		mask-image: linear-gradient(90deg, #000 0, #000 22%, transparent 38%, transparent 62%, #000 78%);
	}
	.home-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
	}
	.home-glow-1 { width: 420px; height: 420px; left: -120px; top: 80px; background: rgba(149, 53, 215, 0.28); }
	.home-glow-2 { width: 380px; height: 380px; right: -100px; top: 200px; background: rgba(236, 72, 153, 0.18); }
	.home-glow-3 { width: 300px; height: 300px; right: 220px; top: -80px; background: rgba(149, 53, 215, 0.14); }
	.home-glow-4 { width: 520px; height: 520px; left: -160px; top: 1150px; background: rgba(236, 72, 153, 0.14); }
	.home-glow-5 { width: 560px; height: 560px; right: -180px; top: 1500px; background: rgba(149, 53, 215, 0.2); }
	.home-fade {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 260px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff);
	}
	.selected-work {
		padding: 40px 0 150px;
	}
	.selected-work-title {
		font-family: "Montserrat", sans-serif;
		font-weight: 800;
		font-size: 34px;
		color: #111;
	}
	.selected-work-intro {
		font-size: 17px;
		color: #5b5b66;
		padding-top: 8px;
	}
	.selected-work .grid {
		margin-top: 30px;
	}
	.hero-chip {
		position: absolute;
		display: flex;
		align-items: center;
		gap: 8px;
		background: #fff;
		border-radius: 14px;
		padding: 10px 14px;
		font-size: 13px;
		font-weight: 600;
		color: #3d1657;
		box-shadow: 0 12px 30px rgba(61, 22, 87, 0.12);
		animation: chip-float 6s ease-in-out infinite;
	}
	.hero-chip-icon {
		width: 26px;
		height: 26px;
		border-radius: 8px;
		display: grid;
		place-items: center;
		font-size: 14px;
	}
	.chip-left-1 { left: 6%; top: 120px; --tilt: -6deg; }
	.chip-left-2 { left: 10%; top: 265px; --tilt: 4deg; animation-delay: -2s; }
	.chip-left-3 { left: 5%; top: 410px; --tilt: -3deg; animation-delay: -4s; }
	.chip-right-1 { right: 6%; top: 135px; --tilt: 5deg; animation-delay: -1s; }
	.chip-right-2 { right: 10%; top: 280px; --tilt: -5deg; animation-delay: -3s; }
	.chip-right-3 { right: 5%; top: 420px; --tilt: 3deg; animation-delay: -5s; }
	@keyframes chip-float {
		0%, 100% { transform: translateY(0) rotate(var(--tilt)); }
		50% { transform: translateY(-4px) rotate(var(--tilt)); }
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-chip {
			animation: none;
			transform: rotate(var(--tilt));
		}
	}
	@media (max-width: 900px) {
		.hero-chip {
			display: none;
		}
	}
	@media (max-width: 600px) {
		.hero {
			padding: 44px 20px 30px;
		}
		.hero-title {
			font-size: 36px;
		}
		.hero-lead {
			font-size: 16px;
		}
		.hero-buttons {
			flex-direction: column;
		}
	}
	.btn-outline {
		color: #9535d7;
		border: 2px solid #9535d7;
		background-color: transparent;
	}
	.quote-mark {
		color: #9535d7;
		font-size: 72px;
		line-height: 1;
		font-weight: bold;
		height: 48px;
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