import { readonly, ref } from 'vue'

const DURATION_MS = 3200

// One toast for the whole app (module-level state shared by every caller)
const message = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

export function useToast() {
  function show(text: string): void {
    message.value = text
    clearTimeout(timer)
    timer = setTimeout(() => { message.value = '' }, DURATION_MS)
  }

  function clear(): void {
    clearTimeout(timer)
    message.value = ''
  }

  return { message: readonly(message), show, clear }
}
