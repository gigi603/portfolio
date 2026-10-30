<template>
	<svg :width="size" :height="size" viewBox="0 0 200 200" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<!-- Piste A : une basket en mouvement, posée sur une vague -->
		<template v-if="piste === 'a'">
			<path d="M8 92h26M2 112h32M12 132h22" stroke="#9535d7" stroke-width="5" opacity=".45"/>
			<path d="M48 150V66a12 12 0 0 1 12-12h30l10 34 26 12 36 12a20 20 0 0 1 16 20v18z" fill="#efe3fd" stroke="#9535d7" stroke-width="5"/>
			<path d="M136 110c14 3 28 10 28 24" stroke="#9535d7" stroke-width="4"/>
			<path d="M48 70h38" stroke="#9535d7" stroke-width="4"/>
			<path d="M88 84l12-6M94 96l12-6M104 106l12-6" stroke="#9535d7" stroke-width="4"/>
			<path d="M58 132c14-14 30 4 44-8s26-2 40 4" stroke="#db2777" stroke-width="5"/>
			<path d="M40 150h140a10 10 0 0 1 10 10v0a10 10 0 0 1-10 10H50a10 10 0 0 1-10-10z" fill="#fff" stroke="#9535d7" stroke-width="5"/>
			<path d="M14 188c20-12 40 12 60 0s40 12 60 0 34-8 56 0" stroke="#9535d7" stroke-width="4" opacity=".4"/>
			<path d="M150 64V34l20-5v28" stroke="#9535d7" stroke-width="4"/>
			<circle cx="144" cy="64" r="7" fill="#9535d7"/><circle cx="164" cy="57" r="7" fill="#9535d7"/>
		</template>
		<!-- Piste B : une partition de pas, huit temps numérotés -->
		<template v-else-if="piste === 'b'">
			<path d="M20 196C50 160 70 140 70 110S120 70 128 50 160 40 194 30" stroke="#9535d7" stroke-width="3" stroke-dasharray="2 9" opacity=".5"/>
			<g v-for="step in steps" :key="step.n" :transform="`translate(${step.x} ${step.y}) rotate(${step.r})`">
				<ellipse cx="0" cy="-4" rx="6" ry="9.5" :fill="step.n % 2 ? '#9535d7' : '#efe3fd'" stroke="#9535d7" stroke-width="3"/>
				<ellipse cx="0" cy="12" rx="4.2" ry="4.2" :fill="step.n % 2 ? '#9535d7' : '#efe3fd'" stroke="#9535d7" stroke-width="3"/>
			</g>
			<g v-for="step in steps" :key="'n' + step.n">
				<circle :cx="step.x + (step.n % 2 ? -19 : 19)" :cy="step.y + 2" r="8.5" fill="#fff" stroke="#db2777" stroke-width="2.5"/>
				<text :x="step.x + (step.n % 2 ? -19 : 19)" :y="step.y + 5.8" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="800" font-size="11" fill="#db2777">{{ step.n }}</text>
			</g>
		</template>
		<!-- Piste C : un cypher vu du dessus, le cercle et le danseur au centre -->
		<template v-else>
			<circle cx="100" cy="100" r="72" stroke="#d6c3ee" stroke-width="3" stroke-dasharray="4 8"/>
			<g v-for="angle in [0, 45, 90, 135, 180, 225, 270, 315]" :key="angle" :transform="`rotate(${angle} 100 100)`">
				<rect x="83" y="14" width="34" height="13" rx="6.5" fill="#efe3fd" stroke="#9535d7" stroke-width="3"/>
				<circle cx="100" cy="27" r="8" fill="#9535d7" stroke="#fff" stroke-width="2"/>
			</g>
			<path d="M76 100a24 24 0 0 1 24-24" stroke="#9535d7" stroke-width="4"/>
			<path d="M95 70l6 6-6 6" stroke="#9535d7" stroke-width="4"/>
			<path d="M124 100a24 24 0 0 1-24 24" stroke="#9535d7" stroke-width="4"/>
			<path d="M105 130l-6-6 6-6" stroke="#9535d7" stroke-width="4"/>
			<circle cx="100" cy="100" r="11" fill="#db2777"/>
			<path d="M100 84v-4M116 100h4M100 116v4M84 100h-4" stroke="#db2777" stroke-width="3"/>
		</template>
	</svg>
</template>

<script>
export default {
	name: 'DanceIllustration',
	props: {
		piste: { type: String, required: true },
		size: { type: Number, default: 120 },
	},
	data() {
		return {
			steps: [
				{ n: 1, x: 34, y: 176, r: -8 },
				{ n: 2, x: 70, y: 164, r: 14 },
				{ n: 3, x: 46, y: 124, r: -14 },
				{ n: 4, x: 92, y: 116, r: 20 },
				{ n: 5, x: 80, y: 74, r: 6 },
				{ n: 6, x: 128, y: 82, r: 30 },
				{ n: 7, x: 124, y: 38, r: 18 },
				{ n: 8, x: 170, y: 50, r: 48 },
			],
		}
	},
}
</script>
