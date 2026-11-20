<template>
	<div class="home">
		<!-- HERO -->
		<header class="hero">
			<svg class="hero-bg" viewBox="0 0 1440 1180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
				<defs>
					<radialGradient id="hglow" cx="50%" cy="58%" r="40%"><stop offset="0" stop-color="#9535D7" stop-opacity=".55"/><stop offset=".55" stop-color="#9535D7" stop-opacity=".12"/><stop offset="1" stop-color="#0D0B17" stop-opacity="0"/></radialGradient>
					<linearGradient id="hln" x1="0" x2="1"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity=".05"/></linearGradient>
					<linearGradient id="hlnr" x1="1" x2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity=".05"/></linearGradient>
					<radialGradient id="hwarm" cx="42%" cy="72%" r="22%"><stop offset="0" stop-color="#6E8BFF" stop-opacity=".35"/><stop offset="1" stop-color="#6E8BFF" stop-opacity="0"/></radialGradient>
				</defs>
				<rect width="1440" height="1180" fill="url(#hglow)"/>
				<rect width="1440" height="1180" fill="url(#hwarm)"/>
				<!-- Lines converging on the demo, with small neon points -->
				<g fill="none" stroke="url(#hln)" stroke-width="1">
					<path d="M0 300 C 300 330, 480 470, 640 500"/>
					<path d="M0 380 C 280 400, 470 480, 640 506"/>
					<path d="M0 460 C 260 470, 460 500, 640 512"/>
					<path d="M0 560 C 280 560, 470 530, 640 518"/>
					<path d="M0 650 C 300 620, 480 550, 640 524"/>
					<path d="M0 740 C 320 690, 490 570, 640 530"/>
				</g>
				<g fill="none" stroke="url(#hlnr)" stroke-width="1">
					<path d="M1440 512 L 800 512"/>
					<path d="M1440 420 C 1150 440, 960 495, 800 506"/>
					<path d="M1440 620 C 1150 600, 960 530, 800 518"/>
				</g>
				<g class="neon-dots">
					<circle cx="260" cy="420" r="5" fill="#8FB0FF"/><circle cx="260" cy="420" r="14" fill="#8FB0FF" opacity=".18"/>
					<circle cx="170" cy="350" r="5" fill="#8FB0FF"/><circle cx="170" cy="350" r="14" fill="#8FB0FF" opacity=".18"/>
					<circle cx="330" cy="604" r="5" fill="#8FB0FF"/><circle cx="330" cy="604" r="14" fill="#8FB0FF" opacity=".18"/>
					<circle cx="1150" cy="512" r="5" fill="#C58CF2"/><circle cx="1150" cy="512" r="14" fill="#C58CF2" opacity=".2"/>
					<circle cx="1020" cy="472" r="4" fill="#8F7BFF"/>
				</g>
			</svg>
			<div class="hero-c wrap">
				<p class="badge"><i></i>{{ $t('hero.available') }}</p>
				<h1><small>{{ $t('hero.h1a') }}</small>{{ titleStart }} <span class="grad nowrap">{{ titleEnd }}</span></h1>
				<div class="demo">
					<a :href="demoPath" class="browser" :aria-label="$t('home.demoLabel')">
						<div class="bar" aria-hidden="true"><i></i><i></i><i></i><span>gilbert-trinidad.com/demo/unfate</span></div>
						<img :src="art.demo" :alt="$t('home.demoAlt')" width="1600" height="1000">
						<span class="play"><b aria-hidden="true">▶</b>{{ $t('home.demoLabel') }}</span>
					</a>
					<img class="dancer" :src="art.runningMan" alt="" aria-hidden="true">
					<span v-for="chip in chips" :key="chip.key" class="chip" :class="chip.pos" aria-hidden="true"><em :class="chip.tone">{{ chip.icon }}</em>{{ $t(`hero.chips.${chip.key}`) }}</span>
				</div>
				<p class="lead">{{ $t('home.leadStart') }}<em class="flow">{{ $t('home.leadFlow') }}</em>{{ $t('home.leadEnd') }}</p>
				<div class="ctas">
					<a href="#projects" class="btn btn-big">{{ $t('hero.seeWork') }}</a>
					<a href="#contact" class="btn btn-ghost">{{ $t('hero.contact') }}</a>
				</div>
			</div>
		</header>

		<div class="wrap">
			<!-- PROJECTS -->
			<section id="projects">
				<div class="sec-head">
					<div><p class="eyb">{{ $t('home.workEyebrow') }}</p><h2 class="kicker">{{ $t('work.title') }}</h2></div>
					<p>{{ $t('work.intro') }}</p>
				</div>
				<article class="card feat">
					<div class="feat-text">
						<span class="label">{{ $t(`projects.${featured.id}.type`) }}</span>
						<h3>{{ featured.name }}</h3>
						<p>{{ $t(`projects.${featured.id}.hook`) }}</p>
						<p class="result"><b>{{ $t('case.resultLabel') }}</b>{{ $t(`projects.${featured.id}.result`) }}</p>
						<div class="ctas ctas-left">
							<a :href="demoPath" class="btn btn-big btn-md">{{ $t('demo.cta') }}</a>
							<router-link :to="{ name: 'ProjectDetailComponent', params: { id: featured.id } }" class="btn btn-ghost btn-sm">{{ $t('home.caseStudy') }}</router-link>
						</div>
					</div>
					<router-link :to="{ name: 'ProjectDetailComponent', params: { id: featured.id } }" class="shot" tabindex="-1" aria-hidden="true"><img loading="lazy" :src="featured.img" alt=""></router-link>
				</article>
				<div class="duo">
					<router-link v-for="project in others" :key="project.id" :to="{ name: 'ProjectDetailComponent', params: { id: project.id } }" class="duo-item">
						<div class="shot"><img loading="lazy" :src="project.img" alt=""></div>
						<span class="label">{{ $t(`projects.${project.id}.type`) }}</span>
						<h3>{{ displayName(project) }}</h3>
						<p>{{ $t(`projects.${project.id}.hook`) }}</p>
						<span class="more">{{ $t('testimonials.seeProject') }}</span>
					</router-link>
				</div>
			</section>

			<!-- WHAT I DO: the illustration stays put and changes as each step scrolls past -->
			<section id="process">
				<div class="sec-head">
					<div><p class="eyb">{{ $t('home.processEyebrow') }}</p><h2 class="kicker">{{ $t('skills.title') }}</h2></div>
					<p>{{ $t('skills.subtitle') }}</p>
				</div>
				<div class="sty">
					<div class="sty-media" aria-hidden="true">
						<div class="sty-frame"><img v-for="(scene, i) in scenes" :key="i" :class="{ on: i === activeStep }" :src="scene" alt=""></div>
						<div class="sty-count"><b>0{{ activeStep + 1 }}</b> / 0{{ steps.length }}</div>
					</div>
					<ol class="sty-steps">
						<li v-for="(key, i) in steps" :key="key" ref="steps" class="sty-step" :class="{ on: i === activeStep }" :data-i="i">
							<img class="sty-inline" loading="lazy" :src="scenes[i]" :alt="$t(`home.sceneAlts.${i}`)">
							<span class="k">{{ $t('skills.count') }} {{ i + 1 }} · {{ $t(`skills.${key}.step`) }}</span>
							<h3>{{ $t(`skills.${key}.name`) }}</h3>
							<p>{{ $t(`skills.${key}.description`) }}</p>
						</li>
					</ol>
				</div>
			</section>

			<!-- TESTIMONIALS -->
			<section id="testimonials">
				<div class="sec-head">
					<div><p class="eyb">{{ $t('home.testimonialsEyebrow') }}</p><h2 class="kicker">{{ $t('testimonials.title') }}</h2></div>
					<p>{{ $t('testimonials.subtitle') }}</p>
				</div>
				<div class="quotes">
					<figure v-for="t in testimonials" :key="t.key" class="quote">
						<div class="mark grad" aria-hidden="true">“</div>
						<blockquote>{{ $t(`testimonials.${t.key}.pullStart`) }}<span class="grad">{{ $t(`testimonials.${t.key}.pullEnd`) }}</span>{{ $t(`testimonials.${t.key}.pullAfter`) }}</blockquote>
						<figcaption class="who"><span class="ini" aria-hidden="true">{{ t.initials }}</span><span><b>{{ t.name }}</b><span>{{ $t(`testimonials.${t.key}.job`) }}</span></span></figcaption>
					</figure>
				</div>
			</section>

			<!-- One wave with the moonwalk dancer, feet on the line -->
			<div class="wave" aria-hidden="true">
				<svg viewBox="0 0 1200 40" preserveAspectRatio="none"><defs><linearGradient id="wv0" x1="0" x2="1"><stop stop-color="#6E8BFF" stop-opacity="0"/><stop offset=".3" stop-color="#8F7BFF"/><stop offset=".7" stop-color="#A64BEB"/><stop offset="1" stop-color="#A64BEB" stop-opacity="0"/></linearGradient></defs><path d="M0 20 C 200 0, 400 0, 600 20 S 1000 40, 1200 20" stroke="url(#wv0)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>
				<div class="mw"><img :src="art.moonwalk" alt="" style="opacity:.25"><img :src="art.moonwalk" alt="" style="opacity:.5"><img :src="art.moonwalk" alt=""></div>
			</div>

			<!-- OFF SCREEN: dance -->
			<section class="dance">
				<p class="eyb">{{ $t('home.dance.eyebrow') }}</p>
				<h2>{{ $t('home.dance.titleStart') }}<span class="grad">{{ $t('home.dance.titleFlow') }}</span>{{ $t('home.dance.titleEnd') }}</h2>
				<p class="lead">{{ $t('home.dance.text') }}</p>
				<div class="moves">
					<article v-for="(move, i) in moves" :key="move.name" class="move">
						<div class="pose"><img loading="lazy" :src="move.img" :alt="$t(`home.dance.moves.${i}.alt`)"></div>
						<h3>{{ move.name }}</h3>
						<p>{{ $t(`home.dance.moves.${i}.text`) }}</p>
						<p class="d">{{ $t(`home.dance.moves.${i}.design`) }}</p>
					</article>
				</div>
				<p class="spots">{{ $t('home.dance.spots') }}</p>
			</section>

			<!-- Six-step with resonance rings, as a transition -->
			<div class="landing" aria-hidden="true">
				<svg class="ripple" viewBox="0 0 600 140"><g fill="none" stroke="#fff">
					<ellipse cx="309" cy="70" rx="95" ry="20" stroke-opacity=".38"/>
					<ellipse cx="309" cy="70" rx="150" ry="32" stroke-opacity=".22"/>
					<ellipse cx="309" cy="70" rx="210" ry="45" stroke-opacity=".13"/>
					<ellipse cx="309" cy="70" rx="290" ry="62" stroke-opacity=".06"/>
					<ellipse cx="241" cy="62" rx="22" ry="6" stroke="#C58CF2" stroke-opacity=".7"/>
					<ellipse cx="241" cy="62" rx="40" ry="11" stroke="#C58CF2" stroke-opacity=".3"/>
					<ellipse cx="360" cy="70" rx="24" ry="6" stroke="#8FB0FF" stroke-opacity=".7"/>
					<ellipse cx="360" cy="70" rx="44" ry="11" stroke="#8FB0FF" stroke-opacity=".3"/>
				</g><ellipse cx="309" cy="70" rx="85" ry="14" fill="#9535D7" opacity=".28"/></svg>
				<img :src="art.sixStep" alt="">
			</div>
			<p class="reso"><span>{{ $t('home.resonance.label') }}</span>{{ $t('home.resonance.text') }}</p>

			<!-- ABOUT -->
			<section id="about">
				<div class="about">
					<div class="portrait"><div class="pring"></div><div class="pring r2"></div><div class="ph"><img loading="lazy" :src="art.photo" :alt="$t('home.photoAlt')"></div></div>
					<div>
						<p class="eyb">{{ $t('about.title') }}</p>
						<h2 class="kicker">{{ $t('home.aboutTitleA') }}<br><span class="accent">{{ $t('home.aboutTitleB') }}</span></h2>
						<p>{{ $t('about.p1Start') }}<b>{{ $t('about.p1Highlight') }}</b>{{ $t('about.p1End') }}</p>
						<p>{{ $t('about.p2') }}</p>
						<div class="ctas ctas-left"><a :href="cvUrl" download class="btn btn-big btn-md">{{ $t('about.cv') }}</a></div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import projects from '../db/projects'

const STEPS = ['ux', 'ui', 'proto', 'test', 'dev']

export default {
	name: 'HomeComponent',
	data() {
		return {
			projects,
			steps: STEPS,
			activeStep: 0,
			observer: null,
			scenes: [
				require('@/assets/images/neon/scene-ecoute.webp'),
				require('@/assets/images/neon/scene-imagine.webp'),
				require('@/assets/images/neon/scene-cercle.webp'),
				require('@/assets/images/neon/scene-repete.webp'),
				require('@/assets/images/neon/scene-scene.webp'),
			],
			moves: [
				{ name: 'Toprock', img: require('@/assets/images/neon/toprock.webp') },
				{ name: 'Popping', img: require('@/assets/images/neon/popping.webp') },
				{ name: 'Locking point', img: require('@/assets/images/neon/locking.webp') },
			],
			art: {
				demo: require('@/assets/images/neon/unfate-demo.webp'),
				runningMan: require('@/assets/images/neon/running-man.webp'),
				moonwalk: require('@/assets/images/neon/moonwalk.webp'),
				sixStep: require('@/assets/images/neon/six-step.webp'),
				photo: require('@/assets/images/danse/photo-apropos.webp'),
			},
			// Neon labels floating around the demo
			chips: [
				{ key: 'research', icon: '01', tone: 't-violet', pos: 'c1' },
				{ key: 'claudeFigma', icon: '✦', tone: 't-blue', pos: 'c2' },
				{ key: 'prototyping', icon: '</>', tone: 't-sky', pos: 'c3' },
				{ key: 'launch', icon: '✓', tone: 't-mint', pos: 'c4' },
			],
			testimonials: [
				{ key: 'sophie', name: 'Sophie Pratt', initials: 'S' },
				{ key: 'melodie', name: 'Mélodie Yeremian', initials: 'M' },
			],
		}
	},
	computed: {
		featured() {
			return this.projects.find(p => p.featured) || this.projects[0]
		},
		others() {
			return this.projects.filter(p => p !== this.featured)
		},
		demoPath() {
			return (this.featured.demo && this.featured.demo.path) || '/demo/unfate/'
		},
		// "Product Designer / Builder": the part after the slash gets the gradient
		titleStart() {
			return this.$t('hero.h1b').split(' / ')[0]
		},
		titleEnd() {
			const parts = this.$t('hero.h1b').split(' / ')
			return parts[1] ? '/ ' + parts[1] : ''
		},
		cvUrl() {
			return this.$i18n.locale === 'en' ? '/files/Gilbert-Trinidad-Resume.pdf' : '/files/Gilbert-Trinidad-CV.pdf'
		},
	},
	mounted() {
		if (!('IntersectionObserver' in window)) return
		// A step becomes active when it crosses the middle of the screen
		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) this.activeStep = Number(entry.target.dataset.i)
			})
		}, { rootMargin: '-45% 0px -45% 0px' })
		;(this.$refs.steps || []).forEach(el => this.observer.observe(el))
	},
	// Vue 2 lifecycle name (the lint config uses Vue 3 rules)
	// eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
	beforeDestroy() {
		if (this.observer) this.observer.disconnect()
	},
	methods: {
		displayName(project) {
			return project.name === 'Melodie Yeremian' ? 'Mélodie Yeremian' : project.name
		},
	},
}
</script>

<style scoped>
.home {
	--bg: #0D0B17; --bg2: #151026; --card: rgba(28, 22, 48, .72); --line: rgba(255, 255, 255, .08);
	--muted: #CDC9E7; --dim: #8F8AB5; --purple: #9535D7; --violet: #A64BEB; --lilac: #C58CF2; --sky: #8FB0FF;
	--grad: linear-gradient(90deg, #B865F2 0%, #A15CEF 50%, #6E8BFF 100%);
	background: var(--bg);
	color: #fff;
	font-family: Urbanist, system-ui, sans-serif;
	-webkit-font-smoothing: antialiased;
	overflow-x: clip;
}
.home *, .home h1, .home h2, .home h3, .home p, .home span, .home a, .home li { font-family: Urbanist, system-ui, sans-serif; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 32px; position: relative; }
.grad { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.nowrap { white-space: nowrap; }
.kicker { font-weight: 900; text-transform: uppercase; letter-spacing: .2em; font-size: 28px; line-height: 1.25; }
.kicker .accent { color: var(--violet); }
.eyb { font-size: 13px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--dim); margin-bottom: 16px; }
.lead { font-size: 20px; line-height: 1.55; color: var(--muted); font-weight: 500; }

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 999px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; font-size: 13px; padding: 12px 22px; border: 1px solid rgba(181, 110, 240, .45); color: #fff; }
.btn-big { font-size: 17px; padding: 20px 40px; border: 1px solid rgba(200, 190, 255, .55); background: radial-gradient(130% 150% at 85% 80%, #6E8BFF 0%, #9535D7 48%, #8A2FCB 100%); box-shadow: inset 0 2px 0 rgba(255, 255, 255, .35), inset 0 -6px 18px rgba(60, 20, 120, .45), 0 10px 50px rgba(79, 107, 255, .35), 0 0 90px rgba(149, 53, 215, .45); }
.btn-ghost { background: transparent; border-color: rgba(255, 255, 255, .18); font-size: 15px; padding: 19px 30px; }
.btn-md { font-size: 15px; padding: 16px 28px; }
.btn-sm { font-size: 13px; padding: 16px 22px; }
.btn:hover { filter: brightness(1.08); }
.btn:focus-visible, .browser:focus-visible, .duo-item:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
.ctas { display: flex; gap: 16px; justify-content: center; margin-top: 40px; }
.ctas-left { justify-content: flex-start; margin-top: 28px; }

/* hero */
.hero { position: relative; height: 1180px; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hero-c { position: relative; z-index: 2; text-align: center; padding-top: 150px; }
.badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px 8px 12px; border-radius: 999px; background: rgba(144, 255, 188, .12); border: 1px solid rgba(144, 255, 188, .3); color: #B9FFD6; font-size: 14px; font-weight: 600; }
.badge i { width: 8px; height: 8px; border-radius: 50%; background: #7CF5B0; box-shadow: 0 0 12px #7CF5B0; }
h1 { margin-top: 26px; font-size: 64px; line-height: 1.08; font-weight: 800; letter-spacing: -.01em; }
h1 small { display: block; font-size: 22px; font-weight: 600; color: var(--muted); letter-spacing: .02em; margin-bottom: 14px; }
.demo { position: relative; width: 760px; max-width: 100%; margin: 44px auto 0; }
.browser { display: block; position: relative; border-radius: 18px; overflow: hidden; background: #1A1430; border: 1px solid rgba(255, 255, 255, .14); box-shadow: 0 40px 90px rgba(0, 0, 0, .55), 0 0 120px rgba(166, 75, 235, .35); }
.browser .bar { height: 34px; display: flex; align-items: center; gap: 7px; padding: 0 14px; background: rgba(255, 255, 255, .04); border-bottom: 1px solid rgba(255, 255, 255, .08); }
.browser .bar i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, .18); }
.browser .bar span { margin-left: 14px; font-size: 12px; font-weight: 600; color: var(--dim); background: rgba(0, 0, 0, .25); padding: 4px 14px; border-radius: 8px; }
.browser > img { display: block; width: 100%; height: auto; }
.play { position: absolute; right: 18px; bottom: 18px; display: flex; align-items: center; gap: 10px; padding: 10px 18px 10px 10px; border-radius: 999px; font-size: 14px; font-weight: 800; background: rgba(13, 11, 23, .85); border: 1px solid rgba(181, 110, 240, .5); box-shadow: 0 0 30px rgba(166, 75, 235, .45); }
.play b { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; background: radial-gradient(circle at 30% 70%, #6E8BFF, #8F7BFF 40%, #A64BEB); }
.browser:hover .play { border-color: #fff; }
.dancer { position: absolute; left: -200px; bottom: -60px; width: 250px; pointer-events: none; }
.chip { position: absolute; z-index: 3; display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 700; padding: 8px 14px 8px 9px; border-radius: 12px; white-space: nowrap; color: #F3E8FF; background: rgba(20, 14, 36, .78); border: 1px solid rgba(197, 140, 242, .65); box-shadow: 0 0 0 1px rgba(197, 140, 242, .15), 0 0 18px rgba(166, 75, 235, .55), inset 0 0 12px rgba(166, 75, 235, .25); text-shadow: 0 0 10px rgba(226, 194, 250, .6); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
.chip em { font-style: normal; width: 24px; height: 24px; border-radius: 7px; display: grid; place-items: center; font-size: 11px; font-weight: 800; text-shadow: none; }
.chip .t-violet { background: rgba(181, 110, 240, .25); color: #E2C2FA; box-shadow: 0 0 10px rgba(181, 110, 240, .6); }
.chip .t-blue { background: rgba(143, 176, 255, .22); color: #C9D7FF; box-shadow: 0 0 10px rgba(110, 139, 255, .6); }
.chip .t-sky { background: rgba(144, 215, 255, .2); color: #BDE9FF; box-shadow: 0 0 10px rgba(144, 215, 255, .55); }
.chip .t-mint { background: rgba(144, 255, 188, .18); color: #B9FFD6; box-shadow: 0 0 10px rgba(124, 245, 176, .55); }
.c1 { right: -130px; top: -22px; }
.c2 { right: -160px; top: 120px; }
.c3 { right: -140px; top: 262px; }
.c4 { right: -100px; bottom: -20px; }
.hero .lead { max-width: 690px; margin: 56px auto 0; }
.flow { font-style: italic; font-weight: 800; color: #fff; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 6'%3E%3Cpath d='M0 3 Q 5 0 10 3 T 20 3 T 30 3 T 40 3' stroke='%23B865F2' stroke-width='1.8' fill='none'/%3E%3C/svg%3E") repeat-x 0 100% / 20px 6px; padding-bottom: 6px; }

/* sections */
section { padding-top: 190px; position: relative; scroll-margin-top: 90px; }
.sec-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 70px; }
.sec-head > p { max-width: 420px; color: var(--muted); font-size: 18px; line-height: 1.55; font-weight: 500; }
.card { position: relative; border-radius: 28px; background: var(--card); border: 1px solid var(--line); overflow: hidden; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06); }
.shot { display: block; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, .1); box-shadow: 0 30px 60px rgba(0, 0, 0, .45); }
.shot img { display: block; width: 100%; }
.label { font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--dim); }
.feat { display: grid; grid-template-columns: 1fr 1.25fr; gap: 40px; padding: 48px; align-items: center; }
.feat::before { content: ""; position: absolute; right: -120px; bottom: -160px; width: 620px; height: 520px; background: radial-gradient(closest-side, rgba(143, 123, 255, .45), rgba(166, 75, 235, .25) 50%, transparent); filter: blur(10px); }
.feat-text { position: relative; }
.feat h3 { font-size: 40px; font-weight: 800; line-height: 1.1; margin: 16px 0; }
.feat p { color: var(--muted); font-size: 18px; line-height: 1.55; font-weight: 500; }
.feat .result { margin-top: 22px; font-size: 16px; }
.feat .result b { color: var(--sky); font-size: 11px; letter-spacing: .18em; text-transform: uppercase; font-weight: 800; margin-right: 8px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px; }
.duo .shot { margin-bottom: 26px; transition: transform .3s ease; }
.duo-item:hover .shot { transform: translateY(-4px); }
.duo h3 { font-size: 28px; font-weight: 800; line-height: 1.15; margin: 16px 0 10px; }
.duo p { color: var(--muted); font-size: 16px; line-height: 1.55; font-weight: 500; }
.more { display: inline-block; margin-top: 14px; font-weight: 800; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--lilac); }

/* scrollytelling */
.sty { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start; }
.sty-media { position: sticky; top: 110px; height: 560px; display: flex; flex-direction: column; justify-content: center; }
.sty-frame { position: relative; height: 460px; background: radial-gradient(55% 50% at 50% 60%, rgba(149, 53, 215, .28), transparent 72%); }
.sty-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transform: scale(.96); transition: opacity .5s ease, transform .5s ease; }
.sty-frame img.on { opacity: 1; transform: none; }
.sty-count { margin-top: 18px; text-align: center; font-size: 13px; font-weight: 800; letter-spacing: .2em; color: var(--dim); }
.sty-count b { color: #fff; }
.sty-steps { list-style: none; margin: 0; position: relative; border-left: 1px solid rgba(255, 255, 255, .1); padding-left: 44px; }
.sty-step { position: relative; min-height: 520px; display: flex; flex-direction: column; justify-content: center; opacity: .3; transition: opacity .4s ease; }
.sty-step:first-child { min-height: 360px; justify-content: flex-start; padding-top: 100px; }
.sty-step:last-child { min-height: 420px; }
.sty-step::before { content: ""; position: absolute; left: -50px; top: 50%; width: 11px; height: 11px; border-radius: 50%; background: #2A2142; border: 1px solid rgba(255, 255, 255, .2); }
.sty-step:first-child::before { top: 118px; }
.sty-step.on { opacity: 1; }
.sty-step.on::before { background: var(--violet); border-color: #E2C2FA; box-shadow: 0 0 0 6px rgba(166, 75, 235, .18), 0 0 18px rgba(166, 75, 235, .9); }
.sty-step .k { font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--sky); margin-bottom: 12px; }
.sty-step h3 { font-size: 34px; font-weight: 800; line-height: 1.15; margin-bottom: 16px; }
.sty-step p { font-size: 18px; line-height: 1.6; color: var(--muted); font-weight: 500; max-width: 460px; }
.sty-inline { display: none; }

/* testimonials */
.quotes { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
.quote { margin: 0; }
.quote .mark { font-size: 80px; line-height: .6; font-weight: 900; height: 34px; }
.quote blockquote { font-size: 24px; line-height: 1.5; font-weight: 600; color: #EEEAF7; margin: 12px 0 0; }
.who { margin-top: 28px; display: flex; align-items: center; gap: 14px; }
.ini { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; font-weight: 900; font-size: 18px; background: linear-gradient(135deg, #34265A, #1A1430); border: 1px solid rgba(255, 255, 255, .14); }
.who b { display: block; font-size: 16px; }
.who span span { font-size: 14px; color: var(--dim); font-weight: 600; }

/* wave + moonwalk */
.wave { position: relative; height: 150px; margin-top: 150px; }
.wave svg { position: absolute; left: 0; right: 0; bottom: 20px; width: 100%; height: 40px; }
.wave .mw { position: absolute; left: 50%; bottom: 34px; transform: translateX(-50%); display: flex; align-items: flex-end; }
.wave .mw img { height: 110px; margin-left: -22px; }
.wave + section { padding-top: 30px; }

/* dance */
.dance { text-align: center; }
.dance h2 { font-size: 44px; font-weight: 800; line-height: 1.1; margin: 0 auto; max-width: 760px; }
.dance .lead { max-width: 680px; margin: 20px auto 0; }
.moves { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; margin-top: 70px; }
.move .pose { height: 220px; display: grid; place-items: end center; margin-bottom: 10px; }
.move .pose img { max-height: 210px; max-width: 85%; }
.move h3 { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
.move p { color: var(--muted); font-size: 15px; line-height: 1.5; font-weight: 500; }
.move .d { margin-top: 12px; color: #8F7BFF; font-weight: 700; font-size: 14px; }
.spots { margin-top: 50px; font-size: 15px; font-weight: 600; color: var(--dim); }

/* six-step resonance */
.landing { position: relative; width: 520px; height: 180px; margin: 110px auto 40px; }
.landing img { position: absolute; left: 50%; bottom: 34px; height: 130px; transform: translateX(-50%); }
.landing .ripple { position: absolute; width: 520px; height: 121px; left: 0; bottom: -20px; }
.reso { max-width: 560px; margin: -10px auto 0; text-align: center; font-size: 18px; line-height: 1.55; font-weight: 500; color: var(--muted); }
.reso span { display: block; margin-bottom: 8px; font-size: 12px; font-weight: 800; letter-spacing: .24em; text-transform: uppercase; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.reso + section { padding-top: 70px; }

/* about */
.about { display: grid; grid-template-columns: 420px 1fr; gap: 70px; align-items: center; }
.portrait { position: relative; width: 340px; height: 440px; margin: 0 auto; }
.portrait .pring { position: absolute; inset: -34px; border-radius: 48%; border: 1px solid rgba(255, 255, 255, .08); }
.portrait .pring.r2 { inset: -74px; border-color: rgba(255, 255, 255, .05); }
.portrait .ph { position: absolute; inset: 0; border-radius: 44px; overflow: hidden; background: radial-gradient(circle at 50% 70%, #8F7BFF 0%, #A64BEB 45%, #3A1F66 100%); border: 1px solid rgba(255, 255, 255, .18); box-shadow: 0 0 120px rgba(166, 75, 235, .45); }
.portrait img { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 96%; width: auto; max-width: none; }
.about h2 { margin-bottom: 26px; }
.about p { font-size: 19px; line-height: 1.65; color: var(--muted); font-weight: 500; margin-bottom: 18px; }
.about p b { color: #fff; }

@media (prefers-reduced-motion: reduce) {
	.sty-frame img, .sty-step, .duo .shot { transition: none; }
}

/* mobile */
@media (max-width: 860px) {
	.wrap { padding: 0 20px; }
	.hero { height: auto; padding-bottom: 40px; }
	.hero-c { padding-top: 110px; }
	h1 { font-size: 38px; }
	h1 small { font-size: 18px; }
	.badge { font-size: 12px; }
	.demo { margin-top: 140px; }
	.dancer { left: auto; right: -6px; bottom: auto; top: -150px; width: 130px; }
	.browser .bar span { display: none; }
	.play { font-size: 12px; right: 10px; bottom: 10px; }
	.chip { position: static; display: inline-flex; margin: 14px 4px 0; font-size: 12px; }
	.hero .lead { font-size: 17px; margin-top: 34px; }
	.ctas { flex-direction: column; align-items: stretch; gap: 12px; }
	.btn-big { font-size: 15px; padding: 18px; }
	section { padding-top: 110px; }
	.kicker { font-size: 22px; letter-spacing: .14em; }
	.sec-head { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 40px; }
	.sec-head > p { font-size: 16px; }
	.feat { grid-template-columns: 1fr; padding: 22px; gap: 26px; }
	.feat h3 { font-size: 28px; }
	.feat p { font-size: 16px; }
	.duo, .quotes, .about { grid-template-columns: 1fr; }
	.duo h3 { font-size: 23px; }
	.sty { display: block; }
	.sty-media { display: none; }
	.sty-steps { padding-left: 26px; }
	.sty-step, .sty-step:first-child, .sty-step:last-child { min-height: 0; opacity: 1; padding: 0 0 56px; }
	.sty-step::before, .sty-step:first-child::before { left: -32px; top: 6px; background: var(--violet); border-color: #E2C2FA; }
	.sty-inline { display: block; width: 100%; height: 190px; object-fit: contain; margin-bottom: 18px; }
	.sty-step h3 { font-size: 24px; }
	.sty-step p { font-size: 16px; }
	.quotes { gap: 50px; }
	.quote blockquote { font-size: 19px; }
	.wave { margin-top: 100px; height: 120px; }
	.wave .mw img { height: 80px; margin-left: -16px; }
	.dance h2 { font-size: 30px; }
	.moves { grid-template-columns: 1fr; gap: 40px; }
	.move .pose { height: 180px; }
	.move .pose img { max-height: 170px; }
	.landing { margin: 50px auto -20px; left: 50%; transform: translateX(-50%) scale(.68); transform-origin: center bottom; }
	.reso { font-size: 16px; margin-top: 34px; }
	.about { gap: 70px; }
	.portrait { width: 260px; height: 340px; margin-top: 40px; }
	.portrait .pring.r2 { display: none; }
	.portrait .pring { inset: -20px; }
	.about p { font-size: 17px; }
}
</style>
