import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { cardColors } from '../data/catalog'

export const usePreferencesStore = defineStore('preferences', () => {
  const favorite = ref(false)
  const cardColorId = ref('green')
  const search = ref('')

  const cardColor = computed(() => cardColors.find(color => color.id === cardColorId.value) ?? cardColors[0]!)

  function toggleFavorite(): void {
    favorite.value = !favorite.value
  }

  function setCardColor(id: string): void {
    if (cardColors.some(color => color.id === id)) cardColorId.value = id
  }

  function reset(): void {
    favorite.value = false
    cardColorId.value = 'green'
    search.value = ''
  }

  return { favorite, cardColorId, cardColor, search, toggleFavorite, setCardColor, reset }
})
