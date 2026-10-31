<template>
	<svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<template v-if="name === 'casque'"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2.5" y="14" width="5" height="7" rx="2"/><rect x="16.5" y="14" width="5" height="7" rx="2"/></template>
		<template v-else-if="name === 'vinyle'"><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="3"/><path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5"/></template>
		<template v-else-if="name === 'basket'"><path d="M2.5 17V7.5A1.5 1.5 0 0 1 4 6h4l2 4.5 4 1.5 6 1.7a2.5 2.5 0 0 1 1.5 2.3V17z"/><path d="M2.5 17h19v1.5a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M9 12.5l1.8-1.4M11.8 13.6l1.8-1.4"/></template>
		<template v-else-if="name === 'casquette'"><path d="M3 16a8 7.5 0 0 1 16 0"/><path d="M3 16h18.5"/><path d="M11 8.5v-2"/></template>
		<template v-else-if="name === 'micro'"><rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></template>
		<template v-else-if="name === 'enceinte'"><rect x="5" y="2.5" width="14" height="19" rx="3"/><circle cx="12" cy="14.5" r="3.5"/><circle cx="12" cy="7" r="1.2"/></template>
		<template v-else-if="name === 'pas'"><path d="M7 3c1.8 0 3 1.8 3 4.5s-.8 4.5-2.8 4.5S4.3 10.5 4.3 8 5.2 3 7 3z"/><path d="M5.3 14.5h3.5v1.8a1.75 1.75 0 0 1-3.5 0z"/><path d="M17 7c-1.8 0-3 1.8-3 4.5s.8 4.5 2.8 4.5 2.9-1.5 2.9-4S18.8 7 17 7z"/><path d="M18.7 18.5h-3.5v1.3a1.75 1.75 0 0 0 3.5 0z"/></template>
		<template v-else-if="name === 'egaliseur'"><path d="M4 20v-6M8 20V8M12 20v-9M16 20V4M20 20v-11"/></template>
		<template v-else-if="name === 'projecteur'"><rect x="9" y="2.5" width="6" height="4.5" rx="1"/><path d="M9 7L4.5 19.5M15 7l4.5 12.5"/><ellipse cx="12" cy="19.5" rx="7.5" ry="2"/></template>
		<template v-else-if="name === 'couronne'"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/></template>
		<template v-else-if="name === 'cypher'"><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="3.8" r="1.6"/><circle cx="19.1" cy="7.9" r="1.6"/><circle cx="19.1" cy="16.1" r="1.6"/><circle cx="12" cy="20.2" r="1.6"/><circle cx="4.9" cy="16.1" r="1.6"/><circle cx="4.9" cy="7.9" r="1.6"/></template>
		<template v-else-if="name === 'flow'"><path d="M2 9c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1.5"/><path d="M2 15.5c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1.5"/></template>
		<template v-else-if="name === 'metronome'"><path d="M8.5 3h7l3.5 18H5z"/><path d="M12 16l4-9"/><path d="M8 16.5h8"/></template>
		<template v-else><circle cx="12" cy="12" r="9"/></template>
	</svg>
</template>

<script>
// Set d'icônes danse : grille 24 px, trait 2 px, bouts et angles arrondis (mêmes règles que les icônes actuelles du site)
export default {
	name: 'DanceIcon',
	props: {
		name: { type: String, required: true },
		size: { type: Number, default: 24 },
		color: { type: String, default: '#9535d7' },
	},
}
</script>
