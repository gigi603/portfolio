<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import { faWallet } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

// Settings: the wallet linked to the profile, with connect / disconnect
defineProps<{ connected: boolean; address: string }>()
const emit = defineEmits<{ toggle: [] }>()
const { t } = useI18n()
</script>

<template>
  <section class="card wallet-card" aria-labelledby="wallet-title">
    <h2 id="wallet-title" class="wallet-title">{{ t('settings.wallet') }}</h2>
    <div class="row">
      <span class="icon"><FontAwesomeIcon :icon="faWallet" /></span>
      <div class="info">
        <p class="state">{{ connected ? t('account.walletConnected') : t('settings.noWallet') }}</p>
        <p v-if="connected" class="address">{{ address }}</p>
      </div>
      <BaseButton variant="secondary" class="toggle" @click="emit('toggle')">{{ connected ? t('account.disconnectWallet') : t('account.connectWallet') }}</BaseButton>
    </div>
  </section>
</template>

<style scoped>
.wallet-card { max-width: 620px; margin-top: 20px; }
.wallet-title { font-size: 17px; font-weight: 700; margin-bottom: 14px; }
.row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 10px; border: 1px solid var(--uf-line); color: var(--uf-text); flex: none; }
.info { flex: 1 1 160px; }
.state { font-weight: 600; }
.address { color: var(--uf-muted); font-size: 14px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.toggle { flex: none; }
</style>
