<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { faEye, faEyeSlash } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Text field of the Unfate design system (Figma component Champ/Auth)
const props = withDefaults(defineProps<{
  label: string
  type?: 'text' | 'email' | 'password'
  autocomplete?: string
  invalid?: boolean
  describedBy?: string
}>(), { type: 'text', autocomplete: 'off', invalid: false, describedBy: undefined })

const model = defineModel<string>({ required: true })
const id = useId()
const revealed = ref(false)
const inputType = computed(() => (props.type === 'password' && revealed.value ? 'text' : props.type))
</script>

<template>
  <div class="field">
    <label :for="id" class="field-label">{{ label }}</label>
    <div class="field-control">
      <input
        :id="id"
        v-model="model"
        :type="inputType"
        :autocomplete="autocomplete"
        class="field-input"
        :class="{ 'is-invalid': invalid, 'has-toggle': type === 'password' }"
        :aria-invalid="invalid"
        :aria-describedby="describedBy"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="field-toggle"
        :aria-label="revealed ? t('login.hidePassword') : t('login.showPassword')"
        :aria-pressed="revealed"
        @click="revealed = !revealed"
      >
        <FontAwesomeIcon :icon="revealed ? faEyeSlash : faEye" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.field-label { display: block; font-size: 14px; font-weight: 600; margin: 14px 0 8px; }
.field-control { position: relative; }
.field-input { width: 100%; height: 50px; border-radius: 12px; border: 2px solid transparent; background: var(--uf-field); padding: 0 16px; font-size: 16px; color: var(--uf-text); transition: border-color .15s, background-color .15s; }
.field-input:focus { outline: none; border-color: var(--uf-blue); background: #fff; }
.field-input.is-invalid { border-color: var(--uf-red); background: var(--uf-red-bg); }
.field-input.has-toggle { padding-right: 52px; }
.field-toggle { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; color: var(--uf-muted); }
</style>
