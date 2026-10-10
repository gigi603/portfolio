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
		<section class="testimonials" id="testimonials">
			<div class="container mx-auto max-w-7xl px-6">
				<h2 class="section-title">{{ $t('testimonials.title') }}</h2>
				<p class="section-lead">{{ $t('testimonials.subtitle') }}</p>
				<div class="testimonials-grid">
					<article v-for="testimonial in testimonials" :key="testimonial.key" class="testimonial" data-aos="zoom-in">
						<div class="testimonial-icon" aria-hidden="true">
							<svg width="30" height="24" viewBox="0 0 30 24"><g fill="#9535d7"><circle cx="7.5" cy="15.5" r="7.5"/><path d="M1 15C1 7 5.5 2 12.5 0.5l1 2.6C9 4.6 6.6 8 6.4 12z"/><circle cx="22.5" cy="15.5" r="7.5"/><path d="M16 15C16 7 20.5 2 27.5 0.5l1 2.6C24 4.6 21.6 8 21.4 12z"/></g></svg>
						</div>
						<p class="testimonial-pull">{{ $t(`testimonials.${testimonial.key}.pullStart`) }}<em>{{ $t(`testimonials.${testimonial.key}.pullEnd`) }}</em>{{ $t(`testimonials.${testimonial.key}.pullAfter`) }}</p>
						<p class="testimonial-quote">{{ $t(`testimonials.${testimonial.key}.quote`) }}</p>
						<div class="testimonial-author">
							<span class="testimonial-avatar" :style="{ background: testimonial.avatarBg, color: testimonial.avatarColor }" aria-hidden="true">{{ testimonial.initials }}</span>
							<div>
								<p class="testimonial-name">{{ testimonial.name }}</p>
								<p class="testimonial-job">{{ $t(`testimonials.${testimonial.key}.job`) }}</p>
							</div>
							<router-link :to="{ name:'ProjectDetailComponent', params:{ id: testimonial.projectId } }" class="testimonial-link">{{ $t('testimonials.seeProject') }}</router-link>
						</div>
					</article>
				</div>
			</div>
		</section>
		<section class="skills">
			<div class="skills-deco" aria-hidden="true">
				<div class="skills-dots"></div>
				<div class="skills-glow skills-glow-1"></div>
				<div class="skills-glow skills-glow-2"></div>
			</div>
			<div class="container mx-auto max-w-7xl px-6 skills-inner">
				<h2 class="section-title">{{ $t('skills.title') }}</h2>
				<p class="section-lead">{{ $t('skills.subtitle') }}</p>
				<div class="skills-grid">
					<article v-for="(skill, index) in skills" :key="skill.key" class="skill" data-aos="zoom-in">
						<div class="skill-top">
							<span class="skill-icon" :style="{ background: skill.tile }" aria-hidden="true">
								<svg width="30" height="30" viewBox="0 0 24 24" fill="none" :stroke="skill.stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<template v-if="skill.key === 'ux'"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="18" cy="16.5" r="2.5"/><path d="M20 18.5l2 2"/></template>
									<template v-else-if="skill.key === 'ui'"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-4.5-4.5L8 19"/></template>
									<template v-else><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/></template>
								</svg>
							</span>
							<span class="skill-number">0{{ index + 1 }}</span>
						</div>
						<h3>{{ $t(`skills.${skill.key}.name`) }}</h3>
						<p class="skill-description">{{ $t(`skills.${skill.key}.description`) }}</p>
						<ul class="skill-tags">
							<li v-for="tag in $t(`skills.${skill.key}.tags`).split(' | ')" :key="tag">{{ tag }}</li>
						</ul>
					</article>
				</div>
				<div class="tools">
					{{ $t('skills.tools') }}
					<span v-for="tool in tools" :key="tool.name" class="tool"><i :style="{ background: tool.color }"></i>{{ tool.name }}</span>
				</div>
			</div>
		</section>
		<section class="about" id="about">
			<div class="about-inner">
				<div class="about-frame" data-aos="zoom-in">
					<span class="about-dot about-dot-1" aria-hidden="true"></span>
					<span class="about-dot about-dot-2" aria-hidden="true"></span>
					<div class="about-arch">
						<img src="@/assets/images/gilbert-portrait.png" alt="Gilbert Trinidad">
					</div>
					<div class="about-chip about-chip-1" aria-hidden="true"><span class="about-chip-icon" style="background: #f3e8ff">✏️</span>{{ $t('about.chip1') }}</div>
					<div class="about-chip about-chip-2" aria-hidden="true"><span class="about-chip-icon" style="background: #e0f2fe">💻</span>{{ $t('about.chip2') }}</div>
				</div>
				<div class="about-text">
					<h2 class="section-title">{{ $t('about.title') }}</h2>
					<p>{{ $t('about.p1Start') }}<span class="about-highlight">{{ $t('about.p1Highlight') }}</span>{{ $t('about.p1End') }}</p>
					<p>{{ $t('about.p2') }}</p>
					<div class="about-buttons">
						<a href="#contact" class="about-btn about-btn-primary">{{ $t('about.cta') }}</a>
						<a href="/files/Gilbert-Trinidad-CV.pdf" target="_blank" rel="noopener" class="about-btn about-btn-outline">
							{{ $t('about.cv') }}
							<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</a>
					</div>
				</div>
			</div>
		</section>
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
				{ key: 'sophie', projectId: '1', name: 'Sophie Pratt', initials: 'SP', avatarBg: '#f3e8ff', avatarColor: '#7b2cb8' },
				{ key: 'melodie', projectId: '2', name: 'Mélodie Yeremian', initials: 'MY', avatarBg: '#fce7f3', avatarColor: '#be185d' },
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
				{ key: 'ux', tile: '#f3e8ff', stroke: '#9535d7' },
				{ key: 'ui', tile: '#fce7f3', stroke: '#db2777' },
				{ key: 'dev', tile: '#e0f2fe', stroke: '#0284c7' },
			],
			tools: [
				{ name: 'Figma', color: '#a259ff' },
				{ name: 'Claude', color: '#d97757' },
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
	.section-title {
		font-family: "Montserrat", sans-serif;
		font-weight: 800;
		font-size: 34px;
		color: #111;
	}
	.section-lead {
		font-size: 17px;
		color: #5b5b66;
		margin-top: 10px;
	}
	.testimonials {
		position: relative;
		z-index: 1;
		/* White, except the bottom 110px where the skills gradient starts under the cards */
		background: linear-gradient(180deg, #fff calc(100% - 110px), transparent calc(100% - 110px));
	}
	.testimonials-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 28px;
		margin-top: 40px;
	}
	.testimonial {
		display: flex;
		flex-direction: column;
		background: #fff;
		border: 1px solid #efe6fb;
		border-radius: 28px;
		padding: 40px 40px 32px;
		box-shadow: 0 14px 40px rgba(61, 22, 87, 0.08);
	}
	.testimonial-icon {
		width: 60px;
		height: 60px;
		border-radius: 18px;
		background: #f3e8ff;
		display: grid;
		place-items: center;
		margin-bottom: 24px;
	}
	.testimonial-pull {
		font-family: "Montserrat", sans-serif;
		font-weight: 800;
		font-size: 22px;
		line-height: 1.3;
		color: #111;
		margin-bottom: 14px;
	}
	.testimonial-pull em {
		font-style: normal;
		color: #9535d7;
	}
	.testimonial-quote {
		font-size: 16px;
		line-height: 1.7;
		color: #4a4a55;
		flex-grow: 1;
	}
	.testimonial-author {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: 28px;
		padding-top: 24px;
		border-top: 1px solid #f1eaf9;
	}
	.testimonial-avatar {
		flex: 0 0 52px;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-family: "Montserrat", sans-serif;
		font-weight: 800;
		font-size: 17px;
	}
	.testimonial-name {
		font-size: 16px;
		font-weight: 600;
	}
	.testimonial-job {
		font-size: 14px;
		color: #7a7a7a;
	}
	.testimonial-link {
		margin-left: auto;
		font-size: 13px;
		font-weight: 600;
		color: #9535d7;
		background: #f8f2ff;
		border-radius: 9999px;
		padding: 8px 14px;
		white-space: nowrap;
	}
	.testimonial-link:hover {
		background: #f3e8ff;
	}
	.skills {
		position: relative;
		overflow: hidden;
		/* The gradient starts under the testimonial cards, which sit on top of it */
		margin-top: -110px;
		/* Bottom padding matches the gap between testimonials and this title */
		padding: 230px 0 121px;
		background: linear-gradient(180deg, #fff 0, #eee6ff 200px, #eee6ff calc(100% - 180px), #fff 100%);
	}
	.skills-deco {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.skills-dots {
		position: absolute;
		inset: 0;
		-webkit-mask-image: linear-gradient(180deg, transparent 80px, #000 300px, #000 calc(100% - 260px), transparent calc(100% - 60px));
		mask-image: linear-gradient(180deg, transparent 80px, #000 300px, #000 calc(100% - 260px), transparent calc(100% - 60px));
	}
	.skills-dots::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(149, 53, 215, 0.24) 1.7px, transparent 1.7px);
		background-size: 26px 26px;
		-webkit-mask-image: linear-gradient(90deg, #000 0, #000 18%, transparent 34%, transparent 66%, #000 82%);
		mask-image: linear-gradient(90deg, #000 0, #000 18%, transparent 34%, transparent 66%, #000 82%);
	}
	.skills-glow {
		position: absolute;
		width: 420px;
		height: 420px;
		border-radius: 50%;
		filter: blur(60px);
	}
	.skills-glow-1 { left: -140px; top: 180px; background: rgba(149, 53, 215, 0.22); }
	.skills-glow-2 { right: -140px; bottom: 140px; background: rgba(236, 72, 153, 0.16); }
	.skills-inner {
		position: relative;
	}
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 28px;
		margin-top: 44px;
	}
	.skill {
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 28px;
		padding: 34px 32px 30px;
		box-shadow: 0 14px 40px rgba(61, 22, 87, 0.1);
	}
	.skill-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 26px;
	}
	.skill-icon {
		width: 64px;
		height: 64px;
		border-radius: 20px;
		display: grid;
		place-items: center;
	}
	.skill-number {
		font-family: "Montserrat", sans-serif;
		font-weight: 800;
		font-size: 15px;
		color: #d6c3ee;
	}
	.skill h3 {
		font-family: "Montserrat", sans-serif;
		font-weight: 800;
		font-size: 23px;
		margin-bottom: 12px;
	}
	.skill-description {
		font-size: 15.5px;
		line-height: 1.65;
		color: #5b5b66;
		flex-grow: 1;
	}
	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 22px;
		list-style: none;
	}
	.skill-tags li {
		font-size: 12.5px;
		font-weight: 600;
		padding: 6px 12px;
		border-radius: 9999px;
		background: #f6f2fb;
		color: #4a3b5c;
	}
	.tools {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 14px;
		margin-top: 36px;
		font-size: 14px;
		font-weight: 500;
		color: #6b5b80;
	}
	.tool {
		display: flex;
		align-items: center;
		gap: 8px;
		background: #fff;
		border-radius: 9999px;
		padding: 8px 16px;
		box-shadow: 0 4px 14px rgba(61, 22, 87, 0.06);
		color: #111;
	}
	.tool i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		display: inline-block;
	}
	@media (max-width: 900px) {
		.testimonials-grid,
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 600px) {
		.testimonial {
			padding: 28px 24px;
		}
		.testimonial-author {
			flex-wrap: wrap;
		}
		.testimonial-link {
			margin-left: 66px;
		}
		.section-title {
			font-size: 28px;
		}
	}
	.about {
		background: #fff;
		padding: 0 24px 120px;
	}
	.about-inner {
		max-width: 1240px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 480px 1fr;
		gap: 90px;
		align-items: center;
	}
	.about-frame {
		position: relative;
		width: 440px;
		height: 540px;
		margin: 0 auto;
	}
	.about-arch {
		position: absolute;
		inset: 0;
		border-radius: 220px 220px 36px 36px;
		overflow: hidden;
		background: linear-gradient(160deg, #c9a7f0 0%, #b388ea 45%, #e9a8d4 100%);
		box-shadow: 0 30px 60px rgba(61, 22, 87, 0.18);
	}
	.about-arch::before {
		content: "";
		position: absolute;
		width: 360px;
		height: 360px;
		border-radius: 50%;
		left: 40px;
		top: 70px;
		background: rgba(255, 255, 255, 0.22);
	}
	.about-arch::after {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(255, 255, 255, 0.35) 1.6px, transparent 1.6px);
		background-size: 22px 22px;
		-webkit-mask-image: linear-gradient(180deg, #000, transparent 60%);
		mask-image: linear-gradient(180deg, #000, transparent 60%);
	}
	.about-arch img {
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 470px;
		max-width: none;
		transform: translateX(-50%);
		z-index: 1;
	}
	.about-chip {
		position: absolute;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 10px;
		background: #fff;
		border-radius: 16px;
		padding: 12px 16px;
		font-size: 13.5px;
		font-weight: 600;
		color: #3d1657;
		white-space: nowrap;
		box-shadow: 0 14px 30px rgba(61, 22, 87, 0.16);
	}
	.about-chip-icon {
		width: 30px;
		height: 30px;
		border-radius: 10px;
		display: grid;
		place-items: center;
		font-size: 15px;
	}
	.about-chip-1 { left: -46px; top: 150px; transform: rotate(-4deg); }
	.about-chip-2 { right: -40px; bottom: 70px; transform: rotate(3deg); }
	.about-dot {
		position: absolute;
		border-radius: 50%;
	}
	.about-dot-1 { width: 70px; height: 70px; right: -14px; top: 40px; background: #f3e8ff; }
	.about-dot-2 { width: 34px; height: 34px; left: 16px; bottom: -14px; background: #fce7f3; }
	.about-text .section-title {
		margin-bottom: 24px;
	}
	.about-text p {
		font-size: 17.5px;
		line-height: 1.75;
		color: #383a3c;
		margin-bottom: 18px;
	}
	.about-highlight {
		color: #9535d7;
		font-weight: 600;
	}
	.about-buttons {
		display: flex;
		gap: 14px;
		margin-top: 30px;
	}
	.about-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border-radius: 9999px;
		padding: 14px 26px;
		font-size: 15px;
		font-weight: 600;
		transition: opacity 150ms ease;
	}
	.about-btn:hover {
		opacity: 0.85;
	}
	.about-btn-primary {
		background: #9535d7;
		color: #fff;
		box-shadow: 0 10px 24px rgba(149, 53, 215, 0.28);
	}
	.about-btn-outline {
		border: 2px solid #9535d7;
		color: #9535d7;
	}
	@media (max-width: 1023px) {
		.about-inner {
			grid-template-columns: 1fr;
			gap: 56px;
		}
	}
	@media (max-width: 600px) {
		.about {
			padding: 70px 20px 80px;
		}
		.about-frame {
			width: 300px;
			height: 370px;
		}
		.about-arch {
			border-radius: 150px 150px 28px 28px;
		}
		.about-arch::before {
			width: 245px;
			height: 245px;
			left: 27px;
			top: 48px;
		}
		.about-arch img {
			width: 320px;
		}
		.about-chip {
			font-size: 12.5px;
			padding: 10px 12px;
		}
		.about-chip-1 { left: -12px; top: 100px; }
		.about-chip-2 { right: -12px; bottom: 44px; }
		.about-dot-1 { right: -6px; }
		.about-buttons {
			flex-direction: column;
		}
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