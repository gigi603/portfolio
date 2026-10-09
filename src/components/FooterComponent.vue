<template>
    <footer id="contact" style="background-color:#3d1657">
        <h3 class="text-center text-white text-2xl font-bold pt-6 px-6">Let's work together</h3>
        <p class="text-center px-6 pt-2 pb-4" style="color:lightgray;">Tell me about your project, I'll get back to you shortly.</p>
        <div class="max-w-xl mx-auto px-6 pb-6">
          <div v-if="bookingUrl" class="text-center pb-6">
            <p class="text-white pb-4">Prefer to talk? Book a free 30-min call</p>
            <a :href="bookingUrl" target="_blank" rel="noopener" class="inline-block w-full text-white text-base font-bold px-6 py-4 rounded-full hover:opacity-75" style="background-color: #9535d7;">Book a free 30-min call</a>
            <div class="flex items-center pt-6 text-sm" style="color:lightgray;">
              <span class="flex-grow border-t border-gray-500"></span>
              <span class="px-4">or send a message</span>
              <span class="flex-grow border-t border-gray-500"></span>
            </div>
          </div>
          <p v-if="status === 'success'" class="text-center text-white text-lg py-10">Thanks! I'll get back to you within 48h.</p>
          <form v-else @submit.prevent="sendMessage" class="flex flex-col space-y-4">
            <input v-model="form.name" type="text" name="from_name" placeholder="Name" required class="w-full rounded-xl px-4 py-3 bg-white text-black" aria-label="Name">
            <input v-model="form.email" type="email" name="reply_to" placeholder="Email" required class="w-full rounded-xl px-4 py-3 bg-white text-black" aria-label="Email">
            <textarea v-model="form.message" name="message" rows="4" placeholder="Tell me about your project" required class="w-full rounded-xl px-4 py-3 bg-white text-black" aria-label="Tell me about your project"></textarea>
            <!-- Honeypot: hidden from people, bots tend to fill it -->
            <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="honeypot" aria-hidden="true">
            <button type="submit" :disabled="status === 'sending'" class="w-full text-white text-base font-bold px-6 py-4 rounded-full hover:opacity-75 disabled:opacity-50" style="background-color: #9535d7;">
              {{ status === 'sending' ? 'Sending…' : 'Send message' }}
            </button>
            <p v-if="status === 'error'" class="text-center text-white text-sm">
              Something went wrong. Please try again or reach me on
              <a href="https://www.linkedin.com/in/gilbert-trinidad-755417102/" target="_blank" class="underline">LinkedIn</a>.
            </p>
            <p class="text-xs text-center" style="color:lightgray;">
              Your details are only used to reply to you. <router-link to="/politique" class="underline">Privacy policy</router-link>
            </p>
          </form>
        </div>
        <div class="social-network flex flex-wrap justify-center pb-4">
          <div class="flex w-full py-2 justify-center">
            <a href="https://twitter.com/GilbertTrinid17" target="_blank" class="px-6"><img src="@/assets/icons/ri_twitter-fill.svg" alt="Twitter"></a>
            <a href="https://www.linkedin.com/in/gilbert-trinidad-755417102/" target="_blank" class="px-6"><img src="@/assets/icons/ri_linkedin-fill.svg" alt="LinkedIn"></a>
          </div>
            <span class="text-xs text-center" style="color:lightgray;">© 2026 Gilbert Trinidad | <router-link to="/politique">Privacy policy</router-link></span>
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
    }
  },
  methods: {
    async sendMessage() {
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
          { from_name: this.form.name, reply_to: this.form.email, message: this.form.message },
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
  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
  }
</style>
