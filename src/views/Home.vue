<template>
	<div class="container mx-auto px-4">
		<div class="flex flex-wrap px-4">
			<div class="relative bg-white w-full shadow-lg rounded-3xl">
				<div class="px-14 pt-14 grid sm:grid-cols-1 md:grid-cols-3 flex items-center">
					<div class="px-14 xs:col-span-1 sm:col-span-1 md:col-span-2">
						<h1 class="mt-2 mb-4 text-xl font-bold">
						I’m Gilbert Trinidad, I'm a product designer, and I resolve problems for people. How ?
						</h1>
						<p class="my-10 text-sm">I research for the best solution by identifying and amplifying the utility and usability of a product or service to create a simple and intuitive user experience.</p>
						<p class="my-10 text-sm">I make the solution in designing applications to make a beautiful and consistent interface with the user experience.</p>
						<p class="my-10 text-sm">I solve the problem by bringing value to the product or service through my analysis, wireframes, mockups and prototypes and I integrate the design in html/css to simplify the developper’s work.</p>
					</div>
					<div class="px-14">
						<img src="@/assets/images/resolve.jpg"/>
					</div>
				</div>
				<div class="px-14 mb-14 grid sm:grid-cols-1 md:grid-cols-2">
					<a href="/files/CV-english-gilbert-trinidad.pdf" download class="text-center bg-black text-white text-xl px-5 py-4 w-2/5 rounded-full m-auto hover:opacity-75">Download my CV</a>
					<a href="/files/CV-french-gilbert-trinidad.pdf" download  class="text-center bg-black text-white text-xl px-5 py-4 w-2/5 rounded-full m-auto hover:opacity-75">Télécharger mon CV</a>
				</div>
			</div>
			<h2 class="py-8 text-white text-3xl font-bold">SKILLS</h2>  
			<div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
				<div v-for="(skill, index) in skills" :key="index" :class="skill.name" class="rounded-3xl overflow-hidden bg-white shadow-lg" style="height: 300px">
					<div class="p-10" data-aos="zoom-in">
						<img :src="skill.icon" class="mx-auto"/>
						<p class="font-bold text-3xl text-center py-5">{{skill.name}}</p>
						<p v-show-slide="skill.showDetails" :class="skill.name" class="text-gray-700 text-sm pb-5">
							{{skill.description}}
						</p>
						<div v-if="skill.showDetails == true" class="text-center">
							<button @click="toggleDescription(skill)" class="toggle-description w-14 h-14 rounded-full" style="border: 1px solid #D3D3D3" ><font-awesome-icon icon="fa-solid fa-chevron-up" color="#D3D3D3" size="2xl" /></button>
						</div>
						<div v-else class="text-center">
							<button @click="toggleDescription(skill)" class="toggle-description w-14 h-14 rounded-full" style="border: 1px solid #D3D3D3"><font-awesome-icon icon="fa-solid fa-chevron-down" color="#D3D3D3" size="2xl" /></button>
						</div>
					</div>
				</div>
			</div>
			<h2 class="py-8 text-white text-3xl font-bold">PRACTICES</h2>  
			<div class="relative flex flex-row min-w-0 break-words bg-white w-full shadow-lg rounded-3xl">
				<div class="px-14 py-14 xs:grid-cols-1 sm:grid-cols-1 md:w-full flex-auto">
					<div class="slider">
						<VueSlickCarousel v-bind="settings">
							<div v-for="(src, index) in imgs" :key="index" data-aos="zoom-in" class="grid xs:col-span-1 sm:col-span-1">
								<div class="w-60 h-52 grid xs:col-span-1 sm:col-span-1 shadow-md hover:shadow-lg cursor-pointer mx-auto rounded-3xl border-color-card flex justify-center items-center pic"
									@click="() => showImg(index)"
								>
									<img :src="src" class="h-32 mx-auto"  alt="">
								</div>
							</div>
						</VueSlickCarousel>	
						<vue-easy-lightbox
							:visible="visible"
							:imgs="imgs"
							:index="index"
							@hide="handleHide"
						></vue-easy-lightbox>					
						<div class="pt-14 text-center">
							<button @click="goToPractices()" class="bg-black text-white hover:opacity-75 text-xl px-3 py-3 w-1/5 rounded-full m-auto">See my work</button>
						</div>
					</div>
				</div>
			</div>
			<h2 class="py-8 text-white text-3xl font-bold">SOFTWARES</h2>  
			<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
				<div v-for="software in softwares" :key="software.name" :class="software.name" class="rounded-3xl overflow-hidden bg-white shadow-lg" style="height: 300px">
					<div class="p-10" data-aos="zoom-in">
						<img :src="software.icon" class="mx-auto"/>
						<div class="font-bold text-3xl text-center py-5">{{software.name}}</div>
						<p v-show-slide="software.showDetails" :class="software.name" class="text-gray-700 text-sm pb-5">
							{{software.description}}
						</p>
						<div v-if="software.showDetails == true" class="text-center">
							<button @click="toggleDescription(software)" class="toggle-description w-14 h-14 rounded-full" style="border: 1px solid #D3D3D3" ><font-awesome-icon icon="fa-solid fa-chevron-up" color="#D3D3D3" size="2xl" /></button>
						</div>
						<div v-else class="text-center">
							<button @click="toggleDescription(software)" class="toggle-description w-14 h-14 rounded-full" style="border: 1px solid #D3D3D3"><font-awesome-icon icon="fa-solid fa-chevron-down" color="#D3D3D3" size="2xl" /></button>
						</div>
					</div>
				</div>
			</div>
			<h2 class="py-8 text-white text-3xl font-bold">FRAMEWORKS</h2>  
			<div class="grid grid-cols-1 mb-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
				<div v-for="framework in frameworks" :key="framework.name" :class="framework.name" class="rounded-3xl overflow-hidden bg-white shadow-lg" style="height: 300px">
					<div class="p-10" data-aos="zoom-in">
						<img :src="framework.icon" class="mx-auto"/>
						<div class="font-bold text-3xl text-center py-5">{{framework.name}}</div>
						<p v-show-slide="framework.showDetails" :class="framework.name" class="text-gray-700 text-sm pb-5">
							{{framework.description}}
						</p>
						<div v-if="framework.showDetails == true" class="text-center">
							<button @click="toggleDescription(framework)" class="toggle-description w-14 h-14 rounded-full" style="border: 1px solid #D3D3D3" ><font-awesome-icon icon="fa-solid fa-chevron-up" color="#D3D3D3" size="2xl" /></button>
						</div>
						<div v-else class="text-center">
							<button @click="toggleDescription(framework)" class="toggle-description w-14 h-14 rounded-full" style="border: 1px solid #D3D3D3"><font-awesome-icon icon="fa-solid fa-chevron-down" color="#D3D3D3" size="2xl" /></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


export default {
	name: 'Home',
	props: {
		icon: String,
	},
	components: { 
		VueSlickCarousel,
	},
	data: function() {
		return {
			visible: false,
			index: 0,
			settings: {
				"dots": true,
				"focusOnSelect": true,
				"infinite": true,
				"speed": 500,
				"slidesToShow": 3,
				"slidesToScroll": 3,
				"touchThreshold": 5
            },
			skills: [
				{ icon:require("@/assets/icons/icon_ux_design.jpg"), name: "UX DESIGN", description: "UX design is a human-first approach to web design. UX designers depend heavily on research and testing in order to find out what is best for the users according to their needs, what they value and what pains them — and then to design an ideal solution around it.", showDetails: false},
				{ icon:require("@/assets/icons/icon_ui_design.jpg"), name: "UI DESIGN", description: "UI design is the visual side of web design. It’s the UI designer’s job to perfect the tiniest of details on a website like button, color palettes, form etc to create an interface and interactions that users are comfortable and confident with using.", showDetails: false},
				{ icon:require("@/assets/icons/icon_html_css.jpg"), name: "HTML - CSS - JS", description: "HTML, CSS and JS is used to build a website, it composed the pages of a website, the HTML is the structure of the page and the CSS corresponds to the design, and the javascript is used to interact with these elements to do for exemple animations.", showDetails: false},
			],
			imgs: [
				require("@/assets/images/practices/airmusic-september-2021.png"),
				require("@/assets/images/practices/profit-estimation.svg"),
				require("@/assets/images/practices/withdraw-crypto.svg"),
				require("@/assets/images/practices/edit-profile.svg"),
			],
			softwares: [
				{ name: "Figma", icon:require("@/assets/icons/figma_logo.jpg"), description: "Figma gives you all the tools you need for the design phase of the project, including vector tools which are capable of fully-fledged illustration, as well as prototyping capabilities, and code generation for hand-off. Personnaly i use it because it’s very powerful like sketch and it’s free comparate to sketch.", showDetails: false},
				{ name: "VS Code", icon:require("@/assets/icons/vs_code_logo.jpg"), description: "Visual Studio Code is a IDE, I mean a developper software who enable you to code using many programmation language but for a designer/integrator as me, I use it to integrate in html/css the design that I make on figma.", showDetails: false}
			],
			frameworks: [
				{ name: "Bootstrap", icon:require("@/assets/icons/bootstrap_logo.jpg"), description: "Bootstrap is a css framework that allows you to design web pages quickly and customize responsive mobile-first sites. Bootstrap is the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, and it’s simple to use . It simplifies the life of the developer who will concentrate much more on the management of events and datas instead of styling the site.", showDetails: false},
				{ name: "Tailwind css", icon:require("@/assets/icons/tailwindcss_logo.jpg"), description: "Tailwindcss is a css framework like bootstrap. but it has the particularity to use classes to design a website page, which is very powerful, Bootstrap does that but it is very limited comparated to tailwind which has so many classes containing css properties that if you use it correctly you don’t need to add custom css, and it’s very simple to use it too. I personnaly use tailwindcss instead of bootstrap since i discovered it.", showDetails: false}
			],
		}
	},
	created: function () {
		console.log('imgs', this.imgs)
	},
	methods: {
		toggleDescription(item) {
			console.log(item);
			item.showDetails = !item.showDetails
			let test = document.getElementsByClassName(item.name)[0]
			console.log('test', test)
			if(item['showDetails'] == true) {
				document.getElementsByClassName(item.name)[0].style.height = "auto";
			} else {
				document.getElementsByClassName(item.name)[0].style.height = "300px";
				
			}
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

        // Events listeners
        handleAfterChange(event, slick, currentSlide) {
            console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
            console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
        },
        handleBreakpoint(event, slick, breakpoint) {
            console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            console.log('handleLazeLoadError', event, slick, image, imageSource);
        },
	}
  };
</script>

<style scoped>
	.slick-prev,
	.slick-next {
		font-size: 0;
		line-height: 0;
		position: absolute;
		top: 50%;
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
		font-size: 50px;
		line-height: 1;

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
		right: -25px;
	}
	[dir='rtl'] .slick-next {
		right: auto;
		left: -25px;
	}
	.slick-next:before {
		content: '→';
	}
	[dir='rtl'] .slick-next:before {
		content: '←';
	}

	/* Dots */
	.slick-dotted.slick-slider {
		margin-bottom: 30px;
	}

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
</style>

