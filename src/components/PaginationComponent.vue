<template>
    <section class="flex flex-col items-end bg-white rounded-lg py-3 text-gray-700">
        <ul class="flex items-center">
            <li class="pr-6" v-if="this.hasPrev()">
                <a href="#" @click.prevent="this.changePage(this.prevPage)">
                <div class="flex items-center justify-center bg-black rounded-full transform rotate-45 h-8 w-8 paginate">
                    <div class="transform -rotate-45">
                    <svg class="h-5 w-5 paginate-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 19l-7-7 7-7"/>
                    </svg>
                    </div>
                </div>
                </a>
            </li>
            <li class="pr-6" v-if="this.hasFirst()">
                <a href="#" @click.prevent="this.changePage(1)">
                <div class="flex hover:bg-gray-200 rounded-md transform rotate-45 h-6 w-6 items-center justify-center paginate">
                <span class="transform -rotate-45">
                1
                </span>
                </div>
                </a>
            </li>
            <li class="pr-6" v-if="this.hasFirst()">...</li>
            <li class="pr-6" v-for="page in this.pages" v-bind:key="page.id">
                <a href="#" @click.prevent="this.changePage(page)">
                <div :class="this.current == page ? 'paginate bg-black': 'bg-gray paginate'"
                        class="flex rounded-full h-8 w-8 items-center justify-center">
                    <span :class="this.current == page ? 'text-white font-bold current' : 'text-black font-bold'">{{ page }}</span>
                </div>
                </a>
            </li>
            <li class="pr-6" v-if="this.hasLast()">...</li>
            <li class="pr-6" v-if="this.hasLast()">
                <a href="#" @click.prevent="this.changePage(this.totalPages)">
                <div class="flex hover:bg-gray-200 rounded-full h-8 w- items-center justify-center">
                <span class="transform -rotate-45">
                {{ this.totalPages }}
                </span>
                </div>
                </a>
            </li>
            <li v-if="this.hasNext()">
                <a href="#" @click.prevent="this.changePage(this.nextPage)">
                <div class="flex items-center justify-center bg-black rounded-full transform rotate-45 h-8 w-8 paginate">
                    <div class="transform -rotate-45">
                    <svg class="h-5 w-5 paginate-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M9 5l7 7-7 7"/>
                    </svg>
                    </div>
                </div>
                </a>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
  export default {
    name: 'PaginationComponent',
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      perPage: {
        type: Number,
        default: 15
      },
      pageRange: {
        type: Number,
        default: 2
      },
      hover: {
        type: Boolean,
        default: false
  }
    },
    data() {
      return {
        input: ''
      }
    },
    methods: {
      hasFirst() {
        return this.rangeStart !== 1;
      },
      hasLast() {
        return this.rangeEnd < this.totalPages
      },
      hasPrev() {
        return this.current > 1
      },
      hasNext() {
        return this.current < this.totalPages
      },
      changePage(page){
        if (page > 0 && page <= this.totalPages) {
          this.$emit('page-changed', page)
        }
      }
    },
    computed: {
      pages() {
        const pages = [];
        for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
          pages.push(i);
        }
        return pages;
      },
      rangeStart() {
        const start = this.current - this.pageRange
        return start > 0 ? start : 1
      },
      rangeEnd() {
        const end = this.current + this.pageRange
        return end < this.totalPages ? end : this.totalPages
      },
      totalPages() {
        return Math.ceil(this.total / this.perPage)
      },
      nextPage() {
        return this.current + 1
      },
      prevPage() {
        return this.current - 1
      }
    }
  }
</script>
<style scoped>
    .bg-gray {
        background-color:#F4F5F7;
    }

    .paginate:hover {
        background-color: #FFF;
        border: solid 2px black;
    }

    .paginate:hover span.current {
        color: #000;
    }

    .paginate:hover div svg.paginate-icon {
        color: #000;
    }

    .paginate-icon {
        color: #FFF;
    }
    .paginate-icon:hover {
        color: #000;
    }
    
</style>