import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Globally registered in main.ts
declare module 'vue' {
  export interface GlobalComponents {
    FontAwesomeIcon: typeof FontAwesomeIcon
  }
}
export {}
