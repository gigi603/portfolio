<template>
	<div :class="piste ? 'piste-home-' + piste : ''">
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
				<svg v-if="flow" class="piste-waves" viewBox="0 0 1440 520" preserveAspectRatio="none"><path d="M-20 380 C 240 300, 420 470, 720 380 S 1200 290, 1460 360" stroke="#9535d7" stroke-opacity=".18" stroke-width="3" fill="none"/><path d="M-20 420 C 260 340, 460 500, 740 410 S 1220 330, 1460 400" stroke="#9535d7" stroke-opacity=".12" stroke-width="2" fill="none"/><path d="M-20 460 C 280 380, 500 530, 760 440 S 1240 370, 1460 440" stroke="#c084fc" stroke-opacity=".14" stroke-width="2" fill="none"/></svg>
				<div v-if="piste === 'c'" class="piste-rings"><span></span><span></span><span></span></div>
				<DanceIllustration v-if="piste && !flow" class="piste-hero-dancer" :piste="piste" :size="118"/>
				<img v-if="flow" class="art-hero-dancer" :src="art.dancer" alt="">
				<div v-for="chip in chips" :key="chip.key" class="hero-chip" :class="chip.position">
					<span class="hero-chip-icon" :style="{ background: chip.color }"><DanceIcon v-if="pisteData && !light" :name="pisteData.icons.chips[chip.key]" :size="17"/><template v-else>{{ chip.icon }}</template></span>{{ $t(`hero.chips.${chip.key}`) }}
				</div>
			</div>
			<div class="hero-content" data-aos="zoom-in">
				<p v-if="piste" class="piste-tag">{{ pisteData.name }}</p>
				<img v-if="flow" class="art-hero-dancer-mobile" style="display:none" :src="art.dancer" alt="">
				<p class="hero-badge"><i></i>{{ $t('hero.available') }}</p>
				<p v-if="pisteData && pisteData.count" class="piste-count">{{ pisteData.count }}</p>
				<h1 class="hero-title">{{ $t('hero.h1a') }}<br><em>{{ $t('hero.h1b') }}</em></h1>
				<p v-if="pisteData" class="hero-lead" v-html="pisteData.lead"></p>
				<p v-else class="hero-lead">{{ $t('hero.text') }}</p>
				<div class="hero-buttons">
					<a href="#projects" class="hero-btn hero-btn-primary">{{ $t('hero.seeWork') }}</a>
					<a href="#contact" class="hero-btn hero-btn-outline">{{ $t('hero.contact') }}</a>
				</div>
				<a href="#testimonials" class="hero-trust">{{ $t('hero.trusted') }}</a>
			</div>
		</section>
		<ProjectStrip/>
		<section class="selected-work" id="projects">
			<div class="container mx-auto max-w-7xl px-6">
				<img v-if="piste === 'a'" class="art-sticker art-sticker-work" :src="art.objects.casque" alt="">
				<p v-if="pisteData && !light" class="piste-eyebrow"><DanceIcon :name="pisteData.icons.eyebrows.work" :size="15"/>{{ pisteData.eyebrows.work }}</p>
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
				<img v-if="piste === 'a'" class="art-sticker art-sticker-testimonials" :src="art.objects.vinyle" alt="">
				<p v-if="pisteData && !light" class="piste-eyebrow"><DanceIcon :name="pisteData.icons.eyebrows.testimonials" :size="15"/>{{ pisteData.eyebrows.testimonials }}</p>
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
				<img v-if="piste === 'a'" class="art-sticker art-sticker-skills" :src="art.objects.enceinte" alt="">
				<p v-if="pisteData" class="piste-eyebrow"><DanceIcon :name="pisteData.icons.eyebrows.skills" :size="15"/>{{ pisteData.eyebrows.skills }}</p>
				<h2 class="section-title">{{ $t('skills.title') }}</h2>
				<p class="section-lead">{{ $t('skills.subtitle') }}</p>
				<ol v-if="methode === 'fil'" class="art-steps">
					<li v-for="(skill, index) in skills" :key="skill.key" class="art-step" :class="{ 'art-step-reverse': index % 2 }">
						<div class="art-step-node" aria-hidden="true">
							<img :src="methodArt.nodes[index]" alt="">
							<span>{{ index + 1 }}</span>
						</div>
						<div class="art-step-visual">
							<img :src="methodArt.scenes[index]" :alt="methodArt.alts[index]">
						</div>
						<div class="art-step-text">
							<p class="art-step-label">Temps {{ index + 1 }} · {{ methodArt.labels[index] }}</p>
							<h3>{{ $t(`skills.${skill.key}.name`) }}</h3>
							<p class="skill-description">{{ $t(`skills.${skill.key}.description`) }}</p>
							<ul class="skill-tags">
								<li v-for="tag in $t(`skills.${skill.key}.tags`).split(' | ')" :key="tag">{{ tag }}</li>
							</ul>
						</div>
					</li>
				</ol>
				<div v-else class="skills-grid">
					<article v-for="(skill, index) in skills" :key="skill.key" class="skill" data-aos="zoom-in">
						<img v-if="piste === 'a'" class="art-skill-pose" :src="art.skillPoses[index]" alt="">
						<div class="skill-top">
							<span v-if="methode === 'icones' || methode === 'discussion'" class="skill-icon art-skill-icon" :style="{ background: skill.tile }" aria-hidden="true">
								<img :src="methodIcons[index]" alt="">
							</span>
							<span v-else class="skill-icon" :style="{ background: skill.tile }" aria-hidden="true">
								<DanceIcon v-if="pisteData && !light" :name="pisteData.icons.skills[index]" :size="30" :color="skill.stroke"/>
								<svg v-if="!pisteData || light" width="30" height="30" viewBox="0 0 24 24" fill="none" :stroke="skill.stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<template v-if="skill.key === 'ux'"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="18" cy="16.5" r="2.5"/><path d="M20 18.5l2 2"/></template>
									<template v-else-if="skill.key === 'ui'"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-4.5-4.5L8 19"/></template>
									<template v-else><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/></template>
								</svg>
							</span>
							<span v-if="pisteData && pisteData.skillLabels" class="skill-number piste-skill-label">{{ pisteData.skillLabels[index] }}</span>
							<span v-else class="skill-number">0{{ index + 1 }}</span>
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
					<img v-if="piste === 'a'" class="art-about art-about-baskets" :src="art.objects.baskets" alt="">
					<img v-if="piste === 'a'" class="art-about art-about-cap" :src="art.objects.casquette" alt="">
					<span class="about-dot about-dot-1" aria-hidden="true"></span>
					<span class="about-dot about-dot-2" aria-hidden="true"></span>
					<div class="about-arch">
						<img v-if="light" class="art-about-photo" :src="art.photos.sourire" alt="Gilbert Trinidad, souriant">
						<img v-else src="@/assets/images/gilbert-portrait.png" alt="Gilbert Trinidad">
					</div>
					<div v-if="!light" class="about-chip about-chip-1" aria-hidden="true"><span class="about-chip-icon" style="background: #f3e8ff"><DanceIcon v-if="pisteData && !light" :name="pisteData.icons.about[0]" :size="16"/><template v-else>✏️</template></span>{{ $t('about.chip1') }}</div>
					<div v-if="!light" class="about-chip about-chip-2" aria-hidden="true"><span class="about-chip-icon" style="background: #e0f2fe"><DanceIcon v-if="pisteData && !light" :name="pisteData.icons.about[1]" :size="16" color="#0284c7"/><template v-else>💻</template></span>{{ $t('about.chip2') }}</div>
				</div>
				<div class="about-text">
					<p v-if="pisteData && !light" class="piste-eyebrow"><DanceIcon :name="pisteData.icons.eyebrows.about" :size="15"/>{{ pisteData.eyebrows.about }}</p>
					<h2 class="section-title">{{ $t('about.title') }}</h2>
					<p>{{ $t('about.p1Start') }}<span class="about-highlight">{{ $t('about.p1Highlight') }}</span>{{ $t('about.p1End') }}</p>
					<p>{{ $t('about.p2') }}</p>
					<div class="about-buttons">
						<a href="#contact" class="about-btn about-btn-primary">{{ $t('about.cta') }}</a>
						<a :href="cvUrl" target="_blank" rel="noopener" class="about-btn about-btn-outline">
							{{ $t('about.cv') }}
							<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</a>
					</div>
				</div>
			</div>
		</section>
		<section v-if="pisteData" class="piste-dance" :class="'piste-dance-' + piste">
			<div v-if="flow" class="piste-divider-wave" aria-hidden="true"><img v-for="(frame, i) in moonwalkFrames" v-show="light" :key="'mw' + i" class="art-moonwalk" :class="{ 'art-moonwalk-trail': i }" :src="art.moonwalk" :style="{ left: frame.x + '%', top: frame.y + 'px', '--o': frame.o, animationDelay: (3 - i) * 0.25 + 's' }" alt=""><svg viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0 20 C 150 0, 300 40, 450 20 S 750 0, 900 20 S 1100 40, 1200 20" stroke="#9535d7" stroke-width="3" fill="none" stroke-linecap="round"/></svg></div>
			<div v-if="piste === 'b'" class="piste-steps" aria-hidden="true"><span v-for="n in 8" :key="n" :style="{ transform: 'rotate(' + (n % 2 ? -12 : 12) + 'deg) translateY(' + (n % 2 ? 0 : -8) + 'px)' }"><DanceIcon name="pas" :size="26"/><b>{{ n }}</b></span></div>
			<div v-if="piste === 'c'" class="piste-eq" aria-hidden="true"><i v-for="n in 24" :key="n" :style="{ height: (10 + ((n * 37) % 34)) + 'px' }"></i></div>
			<div class="piste-dance-inner">
				<DanceIllustration v-if="piste === 'b'" :piste="piste" :size="150" class="piste-dance-illu"/>
				<p class="piste-eyebrow piste-eyebrow-center"><DanceIcon name="basket" :size="15"/>Hors écran</p>
				<h2 class="section-title">{{ pisteData.dance.title }}</h2>
				<template v-if="flow">
					<p class="art-dance-intro">{{ pisteData.dance.text }}</p>
					<div :class="{ 'art-compact': light }">
					<div v-if="light" class="art-compact-photo">
						<figure class="art-real">
							<img :src="art.photos.fontaine" alt="Gilbert devant la fontaine des Innocents à Paris, en baskets">
							<figcaption><span>En vrai</span>Fontaine des Innocents · Paris</figcaption>
						</figure>
						<p class="art-spots"><DanceIcon name="pas" :size="15"/><b>Mes spots :</b> quai Saint-Bernard, La Felicità, la BnF</p>
					</div>
					<p v-else class="art-subtitle">Planche de mouvements · hip-hop &amp; breaking</p>
					<div class="art-plates">
						<article v-for="(move, i) in shownMoves" :key="move.name" class="art-plate">
							<span class="art-plate-number">0{{ i + 1 }}</span>
							<img :src="move.img" :alt="move.name">
							<h3>{{ move.name }}</h3>
							<p>{{ move.text }}</p>
							<p class="art-plate-design"><DanceIcon name="flow" :size="14"/>{{ move.design }}</p>
						</article>
					</div>
					</div>
					<div v-if="!light" class="art-map">
						<img :src="art.map" alt="Carte illustrée de Paris avec mes spots de danse">
						<div class="art-map-text">
							<p class="art-subtitle">Étude de terrain · Paris</p>
							<h3>Mes spots de danse</h3>
							<p>Les lieux où je m'entraîne et où je regarde danser. Chaque épingle est un vrai spot, à remplir avec les tiens.</p>
							<ul>
								<li v-for="n in 3" :key="n"><span>{{ n }}</span>Spot à compléter · arrondissement</li>
							</ul>
						</div>
					</div>
				</template>
				<div v-else-if="pisteData.dance.cards" class="piste-dance-cards">
					<article v-for="(card, i) in pisteData.dance.cards" :key="card.title" class="piste-dance-card">
						<span class="piste-dance-pose"><DanceIcon :name="pisteData.icons.cards[i]" :size="30"/></span>
						<h3>{{ card.title }}</h3>
						<p>{{ card.text }}</p>
					</article>
				</div>
				<div v-else-if="!flow" class="piste-dance-split">
					<div class="piste-dance-photo" :class="{ 'piste-dance-photo-ring': piste === 'c' }">
						<DanceIllustration :piste="piste" :size="170"/>
						<span>Ta photo ou vidéo de danse ici</span>
					</div>
					<p class="piste-dance-text">{{ pisteData.dance.text }}</p>
				</div>
				<div v-if="pisteData.plates && !flow" class="piste-plates">
					<div v-for="plate in pisteData.plates" :key="plate.title" class="piste-plate">
						<span class="piste-plate-icon"><DanceIcon :name="plate.icon" :size="34"/></span>
						<p class="piste-plate-title">{{ plate.title }}</p>
						<p class="piste-plate-text">{{ plate.text }}</p>
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


		<!-- </div>
	</div> -->
</div>
</template>

<script>
import projects from '../db/projects'
import { BOOKING_URL } from '../config'
import ProjectStrip from '../components/ProjectStrip.vue'
import ProjectCard from '../components/ProjectCard.vue'
import DanceIcon from '../components/DanceIcon.vue'
import DanceIllustration from '../components/DanceIllustration.vue'
import { PISTE, CURRENT, METHODE } from '../pistes'


export default {
	name: 'HomeComponent',
	components: { 
		ProjectStrip,
		ProjectCard,
		DanceIcon,
		DanceIllustration,
	},
	props: {
		icon: {
			type: String,
			default: 'default-icon'
		}
	},
	data: function() {
		return {
			projects: projects,
			piste: CURRENT ? PISTE : '',
			methode: CURRENT ? METHODE : '',
			methodArt: {
				nodes: [
					require('@/assets/images/danse/icone-discussion.png'),
					require('@/assets/images/danse/icone-bulle.png'),
					require('@/assets/images/danse/icone-scene.png'),
				],
				scenes: [
					require('@/assets/images/danse/scene-ecoute.png'),
					require('@/assets/images/danse/scene-imagine.png'),
					require('@/assets/images/danse/scene-scene.png'),
				],
				alts: [
					'Gilbert sur scène, la main au menton, écoute deux personnes lui expliquer leur besoin',
					'Gilbert seul sur scène imagine la chorégraphie, dessinée dans une bulle au-dessus de sa tête',
					'Gilbert danse sur scène devant le public',
				],
				labels: ['Écouter', 'Imaginer la choré', 'Monter sur scène'],
			},
			art: {
				dancer: require('@/assets/images/danse/danseur-trace.png'),
				map: require('@/assets/images/danse/carte-paris.png'),
				moonwalk: require('@/assets/images/danse/moonwalk.png'),
				mapSpots: require('@/assets/images/danse/carte-paris-spots.png'),
				photos: { sourire: require('@/assets/images/danse/photo-apropos.png'), fontaine: require('@/assets/images/danse/photo-fontaine.jpg') },
				objects: {
					casque: require('@/assets/images/danse/casque.png'),
					vinyle: require('@/assets/images/danse/vinyle.png'),
					enceinte: require('@/assets/images/danse/enceinte.png'),
					baskets: require('@/assets/images/danse/baskets.png'),
					casquette: require('@/assets/images/danse/casquette.png'),
				},
				skillPoses: [
					require('@/assets/images/danse/toprock.png'),
					require('@/assets/images/danse/popping.png'),
					require('@/assets/images/danse/locking.png'),
				],
			},
			moves: [
				{ name: 'Toprock', img: require('@/assets/images/danse/toprock.png'), text: 'Les pas debout qui ouvrent un passage et posent le style.', design: 'En design : la première impression.' },
				{ name: 'Running man', img: require('@/assets/images/danse/running-man.png'), text: 'Courir sur place, sans jamais casser le rythme.', design: 'En design : itérer sans perdre le cap.' },
				{ name: 'Popping', img: require('@/assets/images/danse/popping.png'), text: 'Contracter un muscle pile sur le temps, comme une vague.', design: 'En design : le micro-détail qui claque.' },
				{ name: 'Baby freeze', img: require('@/assets/images/danse/baby-freeze.png'), text: "Tenir l'équilibre à l'envers, sans trembler.", design: 'En design : le compromis qui tient.' },
				{ name: 'Six-step', img: require('@/assets/images/danse/six-step.png'), text: 'Le pas de base au sol, six appuis en cercle.', design: "En design : la méthode qu'on répète." },
				{ name: 'Locking point', img: require('@/assets/images/danse/locking.png'), text: 'Le point final, bras tendu vers le ciel.', design: 'En design : livrer.' },
			],
			pisteData: CURRENT,
			bookingUrl: BOOKING_URL,
			chips: [
				{ key: 'research', icon: '🔍', color: '#f3e8ff', position: 'chip-left-1' },
				{ key: 'wireframes', icon: '✏️', color: '#fce7f3', position: 'chip-left-2' },
				{ key: 'prototyping', icon: '🧩', color: '#ede9fe', position: 'chip-left-3' },
				{ key: 'ui', icon: '🎨', color: '#e0f2fe', position: 'chip-right-1' },
				{ key: 'ai', icon: '🤖', color: '#fef3c7', position: 'chip-right-2' },
				{ key: 'launch', icon: '🚀', color: '#dcfce7', position: 'chip-right-3' },
			],
			testimonials: [
				{ key: 'sophie', projectId: '1', name: 'Sophie Pratt', initials: 'SP', avatarBg: '#f3e8ff', avatarColor: '#7b2cb8' },
				{ key: 'melodie', projectId: '2', name: 'Mélodie Yeremian', initials: 'MY', avatarBg: '#fce7f3', avatarColor: '#be185d' },
			],
			skills: [
				{ key: 'ux', tile: '#f3e8ff', stroke: '#9535d7' },
				{ key: 'ui', tile: '#fce7f3', stroke: '#db2777' },
				{ key: 'dev', tile: '#e0f2fe', stroke: '#0284c7' },
			],
			tools: [
				{ name: 'Figma', color: '#a259ff' },
				{ name: 'Claude Code', color: '#d97757' },
				{ name: 'Vue', color: '#42b883' },
				{ name: 'Tailwind', color: '#38bdf8' },
				{ name: 'Git', color: '#f05032' },
				{ name: 'Vercel', color: '#111111' },
			],
			softwares: [
				{ name: "Figma", icon:require("@/assets/icons/figma_logo.svg")},
				{ name: "Framer", icon:require("@/assets/icons/framer_logo.svg")},
				{ name: "React", icon:require("@/assets/icons/react_logo.svg")},
				{ name: "Tailwind css", icon:require("@/assets/icons/tailwind_logo.svg")}
			],
		}
	},
	computed: {
		flow() {
			return this.piste === 'a' || this.piste === 'l'
		},
		light() {
			return this.piste === 'l'
		},
		methodIcons() {
			const first = this.methode === 'discussion' ? 'icone-discussion' : 'icone-yeux-fermes'
			return [
				require(`@/assets/images/danse/${first}.png`),
				require('@/assets/images/danse/icone-bulle.png'),
				require('@/assets/images/danse/icone-scene.png'),
			]
		},
		// Silhouettes du moonwalk : x en % de la vague, y = hauteur du tracé à cet endroit, o = opacité
		moonwalkFrames() {
			return [
				{ x: 56, y: 5, o: 1 },
				{ x: 57.8, y: 5.1, o: 0.45 },
				{ x: 59.6, y: 5.5, o: 0.25 },
				{ x: 61.4, y: 6.1, o: 0.12 },
			]
		},
		shownMoves() {
			return this.light ? [this.moves[0], this.moves[2], this.moves[5]] : this.moves
		},
		cvUrl() {
			return this.$i18n.locale === 'en' ? '/files/Gilbert-Trinidad-Resume.pdf' : '/files/Gilbert-Trinidad-CV.pdf'
		},
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
	}
  };
</script>

<style>
	.art-hero-dancer { position: absolute; left: calc(50% + 400px); top: 40px; width: 300px; }
	.piste-home-a .chip-right-1, .piste-home-a .chip-right-2, .piste-home-a .chip-right-3, .piste-home-l .chip-right-1, .piste-home-l .chip-right-2, .piste-home-l .chip-right-3 { display: none; }
	.piste-home-a .selected-work .container, .piste-home-a .testimonials .container, .piste-home-a .skills-inner { position: relative; }
	.art-sticker { position: absolute; width: 130px; filter: drop-shadow(0 10px 18px rgba(61, 22, 87, .15)); pointer-events: none; }
	.art-sticker-work { right: 40px; top: -30px; transform: rotate(8deg); }
	.art-sticker-testimonials { right: 40px; top: -20px; width: 150px; transform: rotate(-6deg); }
	.art-sticker-skills { right: 30px; top: -10px; width: 150px; transform: rotate(6deg); }
	.piste-home-a .skill { position: relative; overflow: visible; }
	.art-skill-pose { position: absolute; right: 14px; top: -62px; height: 128px; pointer-events: none; }
	.piste-home-a .skill-number { visibility: hidden; }
	.piste-home-a .skills-grid { margin-top: 80px; }
	.art-about { position: absolute; z-index: 3; pointer-events: none; filter: drop-shadow(0 10px 18px rgba(61, 22, 87, .15)); }
	.art-about-baskets { width: 170px; left: -70px; bottom: -30px; transform: rotate(-8deg); }
	.art-about-cap { width: 130px; right: -50px; top: -20px; transform: rotate(10deg); }
	.art-dance-intro { max-width: 640px; margin: 14px auto 0; font-size: 18px; line-height: 1.7; color: #383a3c; }
	.art-subtitle { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #9535d7; margin-top: 44px; }
	.art-plates { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 18px; text-align: left; }
	.art-plate { position: relative; background: #fff; border-radius: 28px; padding: 22px 24px 24px; box-shadow: 0 10px 30px rgba(149, 53, 215, .08); }
	.art-plate img { height: 190px; margin: 0 auto 12px; display: block; object-fit: contain; }
	.art-plate-number { position: absolute; left: 22px; top: 18px; font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 13px; color: #d6c3ee; }
	.art-plate h3 { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 19px; }
	.art-plate p { font-size: 14.5px; line-height: 1.6; color: #5b5b66; margin-top: 4px; }
	.art-plate .art-plate-design { color: #9535d7; font-weight: 600; margin-top: 10px; }
	.art-plate-design svg { display: inline-block; vertical-align: -2px; margin-right: 6px; }
	.about-arch .art-about-photo { width: auto; height: 480px; left: -40px; transform: none; }
	@media (max-width: 600px) { .about-arch .art-about-photo { height: 330px; left: -30px; } .piste-home-l .about-chip-1 { top: 6px; left: -18px; } }
	@media (max-width: 768px) { .piste-dance.piste-dance-l { padding-top: 90px; } .piste-dance .art-moonwalk { height: 80px; } }
	/* Hors écran compact (piste allégée) : photo + 3 mouvements sur une ligne */
	.art-compact { display: grid; grid-template-columns: 280px 1fr; gap: 28px; align-items: center; margin-top: 36px; }
	.art-compact .art-real { width: 100%; margin: 0; }
	.art-compact .art-real figcaption { font-size: 12.5px; white-space: normal; flex-wrap: wrap; text-align: center; }
	.art-compact .art-plates { margin-top: 0; gap: 16px; }
	.art-compact .art-plate { padding: 18px 18px 20px; }
	.art-compact .art-plate img { height: 150px; }
	.art-compact .art-plate h3 { font-size: 17px; }
	.art-compact .art-plate p { font-size: 13.5px; }
	.art-spots { margin-top: 18px; font-size: 13.5px; line-height: 1.5; color: #5b5b66; text-align: center; }
	.art-spots svg { display: inline-block; vertical-align: -3px; margin-right: 6px; }
	.art-spots b { color: #2a1340; }
	.art-real { width: 360px; margin: 36px auto 8px; background: #fff; padding: 12px 12px 16px; border-radius: 22px; box-shadow: 0 14px 36px rgba(149, 53, 215, .14); transform: rotate(-2deg); }
	.art-real img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 14px; }
	.art-real figcaption { margin-top: 12px; font-size: 14px; color: #383a3c; display: flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; }
	.art-real figcaption span { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #db2777; background: #fce7f3; padding: 4px 10px; border-radius: 99px; }
	.art-map { display: grid; grid-template-columns: 1.4fr 1fr; gap: 32px; align-items: center; margin-top: 44px; background: #fff; border-radius: 28px; padding: 28px; text-align: left; box-shadow: 0 10px 30px rgba(149, 53, 215, .08); }
	.art-map img { width: 100%; }
	.art-home { grid-template-columns: 1fr 1.3fr; }
	.art-home img { max-width: 280px; margin: 0 auto; }
	.art-map-text .art-subtitle { margin-top: 0; }
	.art-map-text h3 { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 26px; margin: 6px 0 10px; }
	.art-map-text p { font-size: 15.5px; line-height: 1.65; color: #383a3c; }
	.art-map-text ul { margin-top: 16px; display: grid; gap: 10px; }
	.art-map-text li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: #5b5b66; background: #f7f0ff; border-radius: 9999px; padding: 8px 14px; }
	.art-map-text li span { width: 24px; height: 24px; border-radius: 50%; background: #9535d7; color: #fff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
	.art-skill-icon { width: 96px !important; height: 96px !important; border-radius: 24px; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; }
	.art-skill-icon img { width: 86%; height: 92%; object-fit: contain; object-position: bottom; }
	.art-steps { position: relative; margin-top: 56px; display: grid; gap: 56px; list-style: none; padding: 0; }
	.art-steps::before { content: ""; position: absolute; left: 50%; top: 40px; bottom: 40px; width: 4px; margin-left: -2px; border-radius: 9999px; background: repeating-linear-gradient(to bottom, #f472b6 0 10px, transparent 10px 20px); opacity: .7; }
	.art-step { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; align-items: center; }
	.art-step-reverse .art-step-visual { order: 2; }
	.art-step-node { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 84px; height: 84px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 6px #f3e8ff, 0 12px 30px rgba(61, 22, 87, .15); display: flex; align-items: center; justify-content: center; z-index: 1; }
	.art-step-node img { width: 64px; height: 64px; object-fit: contain; }
	.art-step-node span { position: absolute; right: -6px; top: -6px; width: 28px; height: 28px; border-radius: 50%; background: #9535d7; color: #fff; font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center; }
	.art-step-visual { background: #fff; border-radius: 32px; padding: 20px; box-shadow: 0 14px 40px rgba(61, 22, 87, .1); }
	.art-step-visual img { width: 100%; height: 300px; object-fit: contain; }
	.art-step-text { background: #fff; border-radius: 28px; padding: 30px 32px; box-shadow: 0 14px 40px rgba(61, 22, 87, .1); }
	.art-step-text h3 { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 24px; margin-bottom: 10px; }
	.art-step-label { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 12.5px; letter-spacing: 1px; text-transform: uppercase; color: #db2777; margin-bottom: 8px; }
	.piste-tag { position: fixed; top: 92px; left: 16px; z-index: 50; background: #111; color: #fff; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 9999px; }
	.piste-count { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 14px; letter-spacing: 6px; color: #9535d7; margin: -10px 0 14px; }
	.flow-word { font-style: italic; font-weight: 700; color: #9535d7; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 6'%3E%3Cpath d='M0 3 Q 5 0 10 3 T 20 3 T 30 3 T 40 3' stroke='%239535d7' stroke-width='1.6' fill='none'/%3E%3C/svg%3E") repeat-x 0 100% / 20px 5px; padding-bottom: 4px; }
	.piste-eyebrow { display: inline-block; font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 13px; letter-spacing: .5px; text-transform: uppercase; color: #9535d7; background: #f3e8ff; border-radius: 9999px; padding: 5px 14px; margin-bottom: 12px; }
	.skill .piste-skill-label { color: #9535d7; font-size: 12.5px; background: #f3e8ff; border-radius: 9999px; padding: 4px 10px; }
	.piste-waves { position: absolute; inset: 0; width: 100%; height: 100%; }
	.piste-rings { position: absolute; left: 50%; top: 48%; transform: translate(-50%, -50%); }
	.piste-rings span { position: absolute; left: 50%; top: 50%; border: 2px dashed rgba(149, 53, 215, .18); border-radius: 50%; transform: translate(-50%, -50%); }
	.piste-rings span:nth-child(1) { width: 620px; height: 620px; }
	.piste-rings span:nth-child(2) { width: 820px; height: 820px; border-style: solid; border-color: rgba(149, 53, 215, .10); }
	.piste-rings span:nth-child(3) { width: 1020px; height: 1020px; border-color: rgba(149, 53, 215, .08); }
	.piste-hero-dancer { position: absolute; left: calc(50% + 300px); top: 6px; }
	.piste-eyebrow svg { display: inline-block; vertical-align: -3px; margin-right: 7px; }
	.piste-eyebrow-center { margin-top: 4px; }
	.hero-chip-icon svg, .about-chip-icon svg { display: block; }
	.piste-dance-illu { margin: -10px auto 6px; display: block; }
	.piste-steps { display: flex; gap: 22px; justify-content: center; margin-bottom: 40px; }
	.piste-steps span { display: inline-flex; flex-direction: column; align-items: center; gap: 2px; }
	.piste-steps b { font-family: "Montserrat", sans-serif; font-size: 11px; color: #db2777; }
	.piste-plates { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 36px; }
	.piste-plate { background: #fff; border-radius: 24px; padding: 22px 16px; box-shadow: 0 10px 30px rgba(149, 53, 215, .08); }
	.piste-plate-icon { display: inline-flex; background: #f3e8ff; border-radius: 18px; padding: 12px; margin-bottom: 12px; }
	.piste-plate-title { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 16px; color: #111; }
	.piste-plate-text { font-size: 14px; color: #5b5b66; margin-top: 4px; }
	.piste-dance { background: #fff; padding: 0 24px 110px; }
	.piste-dance-inner { max-width: 1100px; margin: 0 auto; background: #f7f0ff; border-radius: 32px; padding: 56px; text-align: center; }
	.piste-dance-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 32px; text-align: left; }
	.piste-dance-card { background: #fff; border-radius: 24px; padding: 26px; box-shadow: 0 10px 30px rgba(149, 53, 215, .08); }
	.piste-dance-pose { display: inline-flex; background: #f3e8ff; border-radius: 18px; padding: 8px 14px; margin-bottom: 14px; }
	.piste-dance-card h3 { font-family: "Montserrat", sans-serif; font-weight: 800; font-size: 20px; margin-bottom: 8px; }
	.piste-dance-card p, .piste-dance-text { font-size: 16px; line-height: 1.65; color: #383a3c; }
	.piste-dance-split { display: grid; grid-template-columns: 320px 1fr; gap: 40px; align-items: center; margin-top: 32px; text-align: left; }
	.piste-dance-photo { aspect-ratio: 4 / 5; background: #fff; border-radius: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; border: 2px dashed #d6c3ee; color: #9a86b4; font-size: 13px; }
	.piste-dance-photo-ring { border-radius: 50%; aspect-ratio: 1; }
	.piste-dance-text { font-size: 19px; }
	.piste-divider-wave { max-width: 1100px; margin: 0 auto 40px; height: 40px; position: relative; }
	/* Moonwalk en chronophoto : il regarde vers la droite, ses silhouettes passées restent derrière lui sur la vague.
	left/top = point le plus bas du pied, posé sur la courbe (y calculé sur le tracé SVG). */
	.art-moonwalk { position: absolute; height: 120px; transform: translate(-75%, -100%); opacity: var(--o); animation: art-moonwalk 3.2s ease-in-out infinite both; }
	.art-moonwalk-trail { filter: saturate(.55) brightness(1.15); }
	@keyframes art-moonwalk {
		0% { opacity: 0; }
		25%, 80% { opacity: var(--o); }
		100% { opacity: 0; }
	}
	@media (prefers-reduced-motion: reduce) { .art-moonwalk { animation: none; } }
	.piste-divider-wave svg { width: 100%; height: 100%; }
	.piste-eq { display: flex; gap: 6px; justify-content: center; align-items: flex-end; height: 44px; margin-bottom: 40px; }
	.piste-eq i { width: 6px; border-radius: 9999px; background: #9535d7; opacity: .55; }
	@media (max-width: 768px) {
		.piste-dance-inner { padding: 32px 20px; }
		.piste-dance-cards, .piste-dance-split { grid-template-columns: 1fr; }
		.piste-plates { grid-template-columns: 1fr 1fr; }
		.art-hero-dancer { display: none; }
		.art-hero-dancer-mobile { display: block !important; width: 200px; margin: 0 auto 6px; }
		.art-plates { grid-template-columns: 1fr; }
		.art-compact { grid-template-columns: 1fr; }
		.art-compact .art-real { max-width: 300px; margin: 0 auto; }
		/* Sur mobile, les 3 mouvements défilent à l'horizontale pour garder la section courte */
		.art-compact .art-plates { grid-template-columns: none; grid-auto-flow: column; grid-auto-columns: 78%; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; }
		.art-compact .art-plate { scroll-snap-align: start; }
		.art-steps::before { left: 30px; }
		.art-step { grid-template-columns: 1fr; gap: 16px; padding-left: 74px; }
		.art-step-reverse .art-step-visual { order: 0; }
		.art-step-node { left: 30px; top: 40px; width: 60px; height: 60px; }
		.art-step-node img { width: 46px; height: 46px; }
		.art-step-visual img { height: 200px; }
		.art-map { grid-template-columns: 1fr; }
		.art-sticker { width: 84px; right: 0; }
		.art-about-baskets { width: 110px; left: -10px; }
		.art-about-cap { width: 90px; right: -10px; }
		.piste-hero-dancer { display: none; }
		.piste-tag { top: 84px; }
	}
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
</style>