<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/features/auth'
import { useToast } from '@/shared/composables/useToast'
import { useDemoReset } from '@/shared/composables/useDemoReset'
import alex from '@/assets/images/alex.webp'
import { faChevronDown, faGear, faRightFromBracket, faRotateLeft, faWallet } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Account menu (Figma: Menu profil), opened from the avatar in the header
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })

const session = useSessionStore()
const router = useRouter()
const toast = useToast()
const resetDemo = useDemoReset()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

function close(): void {
  open.value = false
}

function onDocumentClick(event: MouseEvent): void {
  if (root.value && !root.value.contains(event.target as Node)) close()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') close()
}

function toggleWallet(): void {
  session.toggleWallet()
  toast.show(session.walletConnected ? t('account.walletConnected') : t('account.walletDisconnected'))
  close()
}

async function logout(): Promise<void> {
  session.logout()
  close()
  await router.push({ name: 'login' })
}

async function restart(): Promise<void> {
  resetDemo()
  close()
  await router.push({ name: 'login' })
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="account">
    <button type="button" class="trigger" aria-haspopup="true" :aria-expanded="open" @click="open = !open">
      <img :src="alex" alt="" class="avatar" />
      <template v-if="!compact">
        <span class="who">
          <span class="name">{{ session.fullName }}</span>
          <!-- Connected wallet shown right under the name, so it stays visible -->
          <span v-if="session.walletConnected" class="trigger-wallet"><FontAwesomeIcon :icon="faWallet" /> {{ session.walletAddress }}</span>
        </span>
        <FontAwesomeIcon :icon="faChevronDown" class="chevron" />
      </template>
      <span v-else class="sr-only">{{ t('account.menu') }}</span>
    </button>
    <div v-if="open" class="menu">
      <p class="name">{{ session.fullName }}</p>
      <p class="email">{{ session.profile.email }}</p>
      <p v-if="session.walletConnected" class="wallet"><FontAwesomeIcon :icon="faWallet" /> {{ t('account.walletConnected') }} <span>{{ session.walletAddress }}</span></p>
      <button type="button" class="item" @click="toggleWallet"><FontAwesomeIcon :icon="faWallet" /> {{ session.walletConnected ? t('account.disconnectWallet') : t('account.connectWallet') }}</button>
      <RouterLink :to="{ name: 'settings' }" class="item" @click="close"><FontAwesomeIcon :icon="faGear" /> {{ t('account.settings') }}</RouterLink>
      <button type="button" class="item" @click="logout"><FontAwesomeIcon :icon="faRightFromBracket" /> {{ t('account.logout') }}</button>
      <button type="button" class="item item-reset" @click="restart"><FontAwesomeIcon :icon="faRotateLeft" /> {{ t('account.restart') }}</button>
    </div>
  </div>
</template>

<style scoped>
.account { position: relative; }
.trigger { display: flex; align-items: center; gap: 12px; border-radius: 10px; }
.avatar { width: 44px; height: 44px; border-radius: 6px; object-fit: cover; }
.name { font-weight: 700; }
.chevron { font-size: 13px; }
.menu { position: absolute; z-index: 40; top: calc(100% + 10px); right: 0; width: 260px; background: #fff; border-radius: 14px; padding: 16px; box-shadow: 0 16px 40px rgb(20 20 43 / 18%); }
.email { color: var(--uf-muted); font-size: 14px; margin: 2px 0 12px; }
/* Connected wallet: neutral box, no colour */
.wallet { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 13px; font-weight: 600; color: var(--uf-text); border: 1px solid var(--uf-line); border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; }
.who { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.trigger-wallet { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; font-weight: 500; color: var(--uf-muted); }
.wallet span { color: var(--uf-muted); font-weight: 500; }
.item { display: flex; gap: 10px; align-items: center; width: 100%; padding: 10px 8px; border-radius: 8px; font-size: 14px; font-weight: 600; text-align: left; text-decoration: none; }
.item:hover { background: var(--uf-field); }
.item-reset { color: var(--uf-muted); border-top: 1px solid var(--uf-line); border-radius: 0 0 8px 8px; margin-top: 6px; padding-top: 12px; }
</style>
