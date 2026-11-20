<template>
  <footer class="site-footer">
    <div class="ct-wrap">
      <section id="contact" class="contact" aria-labelledby="contact-title">
        <svg class="contact-bg" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs><radialGradient id="cg" cx="50%" cy="100%" r="60%"><stop stop-color="#8F7BFF" stop-opacity=".45"/><stop offset=".45" stop-color="#9535D7" stop-opacity=".25"/><stop offset="1" stop-color="#0D0B17" stop-opacity="0"/></radialGradient></defs>
          <rect width="1200" height="520" fill="url(#cg)"/>
          <g fill="none" stroke="#fff"><circle cx="600" cy="560" r="160" stroke-opacity=".1"/><circle cx="600" cy="560" r="280" stroke-opacity=".07"/><circle cx="600" cy="560" r="420" stroke-opacity=".05"/></g>
        </svg>
        <div class="ct">
          <div class="ct-l">
            <p class="eyb">{{ $t('contact.eyebrow') }}</p>
            <h2 id="contact-title" class="kicker">{{ $t('contact.title') }}</h2>
            <p class="lead">{{ $t('contact.subtitle') }}</p>
            <ul class="ct-links">
              <li><span>LinkedIn</span><a href="https://www.linkedin.com/in/gilbert-trinidad-755417102/" target="_blank" rel="noopener">{{ $t('contact.linkedin') }} →</a></li>
              <li><span>{{ $t('nav.cv') }}</span><a :href="cvUrl" download>{{ $t('contact.cvDownload') }}</a></li>
            </ul>
          </div>
          <div class="ct-form">
            <div v-if="status === 'success'" class="ct-ok" role="status">
              <div class="ct-ok-i" aria-hidden="true">✓</div>
              <h3>{{ $t('contact.sentTitle') }}</h3>
              <p>{{ $t('contact.success') }}</p>
              <button type="button" class="btn-ghost" @click="reset">{{ $t('contact.another') }}</button>
            </div>
            <form v-else class="ct-fields" novalidate @submit.prevent="sendMessage">
              <label class="f"><span>{{ $t('contact.name') }}</span><input v-model="form.name" type="text" name="from_name" autocomplete="name" :placeholder="$t('contact.namePlaceholder')" required></label>
              <label class="f" :class="{ bad: emailError }"><span>{{ $t('contact.email') }}</span><input ref="email" v-model="form.email" type="email" name="reply_to" autocomplete="email" :placeholder="$t('contact.emailPlaceholder')" required :aria-invalid="emailError ? 'true' : 'false'" aria-describedby="err-email" @blur="checkEmail"><em v-if="emailError" id="err-email" class="err">{{ $t('contact.emailError') }}</em></label>
              <label class="f"><span>{{ $t('contact.message') }}</span><textarea v-model="form.message" name="message" rows="5" :placeholder="$t('contact.messagePlaceholder')" required></textarea></label>
              <!-- Honeypot: hidden from people, bots tend to fill it -->
              <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="honeypot" aria-hidden="true">
              <button type="submit" class="btn-big" :disabled="status === 'sending'">{{ status === 'sending' ? $t('contact.sending') : $t('contact.send') }}</button>
              <p v-if="status === 'error'" class="ct-note ct-error" role="alert">{{ $t('contact.errorBefore') }} <a href="https://www.linkedin.com/in/gilbert-trinidad-755417102/" target="_blank" rel="noopener">LinkedIn</a>.</p>
              <p class="ct-note">{{ $t('contact.privacyNote') }}</p>
            </form>
          </div>
        </div>
      </section>
      <div class="foot">
        <span>{{ $t('contact.copyright') }} · Paris</span>
        <div><a href="https://www.linkedin.com/in/gilbert-trinidad-755417102/" target="_blank" rel="noopener">LinkedIn</a><router-link to="/politique">{{ $t('contact.privacy') }}</router-link></div>
      </div>
    </div>
  </footer>
</template>

<script>
import emailjs from '@emailjs/browser'
import { BOOKING_URL } from '../config'

export default {
  name: 'FooterComponent',
  data() {
    return {
      form: { name: '', email: '', message: '', website: '' },
      status: 'idle',
      bookingUrl: BOOKING_URL,
      emailError: false,
    }
  },
  computed: {
    cvUrl() {
      return this.$i18n.locale === 'en' ? '/files/Gilbert-Trinidad-Resume.pdf' : '/files/Gilbert-Trinidad-CV.pdf'
    },
  },
  methods: {
    // A light check before sending: the browser's own messages don't match the page
    checkEmail() {
      this.emailError = !!this.form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)
      return !this.emailError
    },
    reset() {
      this.form = { name: '', email: '', message: '', website: '' }
      this.status = 'idle'
    },
    async sendMessage() {
      if (!this.checkEmail()) {
        this.$refs.email.focus()
        return
      }
      // A filled honeypot means a bot: pretend it worked and send nothing
      if (this.form.website) {
        this.status = 'success'
        return
      }
      this.status = 'sending'
      try {
        await emailjs.send(
          process.env.VUE_APP_EMAILJS_SERVICE_ID,
          process.env.VUE_APP_EMAILJS_TEMPLATE_ID,
          // Variable names match the EmailJS "Contact Us" template
          {
            name: this.form.name,
            email: this.form.email,
            title: 'Portfolio',
            message: this.form.message,
            time: new Date().toLocaleString('fr-FR'),
          },
          process.env.VUE_APP_EMAILJS_PUBLIC_KEY
        )
        this.status = 'success'
      } catch (error) {
        console.error('Contact form failed', error)
        this.status = 'error'
      }
    },
  },
};
</script>

<style scoped>
  .site-footer { background: #0d0b17; font-family: Urbanist, system-ui, sans-serif; color: #fff; padding: 130px 0 0; }
  .site-footer * { font-family: inherit; }
  .ct-wrap { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
  .contact { position: relative; overflow: hidden; border-radius: 36px; padding: 80px 70px; background: linear-gradient(180deg, rgba(52, 34, 92, 0.55), rgba(20, 15, 36, 0.9)); border: 1px solid rgba(255, 255, 255, 0.08); scroll-margin-top: 100px; }
  .contact-bg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .ct { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .eyb { font-size: 13px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: #8f8ab5; margin-bottom: 16px; }
  .kicker { font-family: Urbanist, system-ui, sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; font-size: 34px; line-height: 1.25; }
  .lead { margin-top: 22px; max-width: 440px; font-size: 18px; line-height: 1.55; color: #cdc9e7; font-weight: 500; }
  .ct-links { list-style: none; margin: 40px 0 0; padding: 0; display: grid; gap: 16px; }
  .ct-links span { display: block; font-size: 12px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: #8f8ab5; margin-bottom: 4px; }
  .ct-links a { font-size: 16px; font-weight: 600; color: #fff; }
  .ct-links a:hover { color: #c58cf2; }
  .ct-form { position: relative; padding: 36px; border-radius: 24px; background: rgba(13, 11, 23, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); }
  .ct-fields { display: grid; gap: 22px; }
  .f { display: grid; gap: 8px; }
  .f span { font-size: 14px; font-weight: 700; color: #cdc9e7; }
  .f input, .f textarea { width: 100%; font: 500 16px/1.5 Urbanist, system-ui, sans-serif; color: #fff; padding: 14px 16px; border-radius: 14px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.14); outline: none; resize: vertical; }
  .f input::placeholder, .f textarea::placeholder { color: #8a85ad; }
  .f input:focus, .f textarea:focus { border-color: #b865f2; box-shadow: 0 0 0 4px rgba(166, 75, 235, 0.22); }
  .f.bad input { border-color: #ff7a9a; box-shadow: 0 0 0 4px rgba(255, 122, 154, 0.15); }
  .err { font-style: normal; font-size: 14px; font-weight: 600; color: #ff9db5; }
  .honeypot { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
  .btn-big { width: 100%; padding: 18px; border-radius: 999px; font-size: 15px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #fff; border: 1px solid rgba(200, 190, 255, 0.55); background: radial-gradient(130% 150% at 85% 80%, #6e8bff 0%, #9535d7 48%, #8a2fcb 100%); box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.35), inset 0 -6px 18px rgba(60, 20, 120, 0.45), 0 10px 50px rgba(79, 107, 255, 0.35), 0 0 90px rgba(149, 53, 215, 0.45); cursor: pointer; }
  .btn-big:disabled { opacity: 0.6; }
  .btn-big:focus-visible, .btn-ghost:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
  .ct-note { font-size: 13px; color: #8f8ab5; text-align: center; margin-top: -6px; }
  .ct-error { color: #ff9db5; }
  .ct-error a { text-decoration: underline; }
  .ct-ok { text-align: center; padding: 40px 10px; }
  .ct-ok-i { width: 64px; height: 64px; margin: 0 auto 20px; border-radius: 50%; display: grid; place-items: center; font-size: 28px; font-weight: 900; background: radial-gradient(130% 150% at 85% 80%, #6e8bff 0%, #9535d7 55%, #8a2fcb 100%); box-shadow: 0 0 40px rgba(149, 53, 215, 0.6); }
  .ct-ok h3 { font-size: 26px; font-weight: 800; }
  .ct-ok p { margin: 12px auto 26px; max-width: 320px; color: #cdc9e7; font-size: 16px; line-height: 1.55; }
  .btn-ghost { display: inline-flex; padding: 16px 26px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.18); color: #fff; font-weight: 800; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; }
  .foot { display: flex; justify-content: space-between; padding: 56px 0 48px; color: #8f8ab5; font-size: 14px; font-weight: 600; }
  .foot div { display: flex; gap: 28px; }
  .foot a:hover { color: #fff; }
  @media (max-width: 700px) {
    .site-footer { padding-top: 90px; }
    .ct-wrap { padding: 0 20px; }
    .contact { padding: 50px 20px; }
    .ct { grid-template-columns: 1fr; gap: 40px; }
    .kicker { font-size: 24px; }
    .lead { font-size: 16px; }
    .ct-form { padding: 22px; }
    .ct-links { margin-top: 28px; }
    .foot { flex-direction: column; gap: 16px; align-items: center; text-align: center; }
  }
</style>
