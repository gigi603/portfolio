import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LoginForm from './LoginForm.vue'
import { i18n } from '@/shared/i18n'

// The texts checked below are the English ones
i18n.global.locale.value = 'en'

function mountForm() {
  return mount(LoginForm, { global: { plugins: [createPinia(), i18n], components: { FontAwesomeIcon } } })
}

describe('LoginForm', () => {
  it('shows an error when submitted empty', async () => {
    const wrapper = mountForm()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('[role="alert"]').text()).toBe('Please enter your email and password.')
    expect(wrapper.emitted('success')).toBeUndefined()
  })

  it('fills in the demo account and signs in', async () => {
    const wrapper = mountForm()
    const fill = wrapper.findAll('button').find(button => button.text() === 'Fill in for me')!
    await fill.trigger('click')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('success')).toHaveLength(1)
  })
})
