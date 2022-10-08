<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap px-4">
      <form ref="form" @submit.prevent="checkForm" id="contact-form" class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-3xl">
        <div class="pt-10"><h2 class="font-bold text-center text-2xl">CONTACT ME</h2></div>
        <div class=" px-4 md:px-14 py-10 grid sm:grid-cols-1 xs:grid-cols-1 flex-auto rounded-3xl">
          <div class="flex justify-center mb-8">
            <div class="md:w-2/3 sm:w-full xs:w-full lg:w-1/3 floating-input relative">
              <input id="fullname" v-model="user_name" name="user_name" class="h-16 font-bold rounded w-full py-2 px-4 leading-tight focus:border-red" type="text" placeholder="dupont françois" autocomplete="off">
              <label for="fullname" class="block text-gray font-bold mb-2 pr-4 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">
                Full Name
              </label>
              <div class="text-red">{{ errors.user_name }}</div>
            </div>
          </div>
          <div class="flex justify-center mb-8">
            <div class="md:w-2/3 sm:w-full lg:w-1/3 floating-input relative">
              <input id="email" v-model="user_email" name="user_email" class="h-16 font-bold rounded w-full py-2 px-4 leading-tight focus:border-purple-500" type="email" placeholder="name@example.com" autocomplete="off">
              <label for="email" class="block text-gray font-bold mb-2 pr-4 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">
                Email
              </label>
              <div class="text-red">{{ errors.user_email }}</div>
            </div>
          </div>
          <div class="flex justify-center mb-8">
            <div class="md:w-2/3 sm:w-full lg:w-1/3 w-full floating-input relative">
              <textarea id="message" v-model="message" name="message" class="h-32 font-bold rounded w-full py-2 px-4 leading-tight focus:border-red" placeholder="your message" autocomplete="off"></textarea>
              <label for="message" class="block text-gray font-bold mb-2 pr-4 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">
                Your message
              </label>
              <div class="text-red">{{ errors.message }}</div>
            </div>
          </div>
          <div class="flex items-center w-full">
						<!-- <input type="submit" :disabled="user_name == '' && user_email == '' && message == ''" class="text-white bg-black disabled:opacity-1 text-xl send px-3 py-3 w-1/6 rounded-full m-auto" value="Send"/><span class="pr-2">Send</span>  -->
            <button v-bind:class="[{ 'btn-send-disabled cursor-not-allowed text-white text-xl px-3 py-3 md:w-2/6 w-3/5  xs:w-full lg:w-1/6 rounded-full m-auto': (!user_name || !user_email || !message)},
             {'text-white bg-black hover:opacity-75 text-xl px-3 py-3 md:w-2/5 w-2/5 lg:w-1/5 w-full rounded-full m-auto': (user_name != '' && user_email != '' && message != '')}]"
              v-bind:disabled="!user_name || !user_email || !message"><span class ="pr-2">Send</span><font-awesome-icon icon="fa-solid fa-paper-plane" /></button>
          </div>
        </div>
    </form>
    </div>
  </div>
</template>
<script>

import emailjs from '@emailjs/browser';
import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
Vue.use(Toast);

export default {
  name: 'Contact',
  data() {
    return {
      user_name: "",
      user_email: "",
      message: "",
      valid: true,
      success: false,
      errors: {},
    };
  },
  methods: {
    sendMail() {
      emailjs.sendForm('contact_service', 'contact_form', this.$refs.form, 'gTsPbqrhU21F9H-2X')
        .then(() => {
          this.$toast.success("Your message has been sent!");
        }, function() {
          this.$toast.error("Your message has not been sent!");
        });
      
    },
    checkForm() {
      const validateFullName = user_name => {
        if (!user_name.length) {
          return { valid: false, error: "Please enter your fullname" };
        }
        if (user_name.length < 2) {
          return { valid: false, error: "Your fullname is too short" };
        }
        if (user_name.length > 255) {
          return { valid: false, error: "Your fullname is too long" };
        }
        return { valid: true, error: null };
      };
      
      const validateEmail = user_email => {
        if (!user_email.length) {
          return { valid: false, error: "Please enter your email" };
        }
        if (user_email.length < 5) {
          return { valid: false, error: "Your email is too short" };
        }
        if (user_email.length > 255) {
          return { valid: false, error: "Your email is too long" };
        }
        return { valid: true, error: null };
      };
      
      const validateMessage = message => {
        if (!message.length) {
          return { valid: false, error: "Please enter your message" };
        }
        if (message.length < 7) {
          return { valid: false, error: "Your Message is too short" };
        }
        if (message.length > 1000) {
          return { valid: false, error: "Your Message is too long" };
        }
        
        return { valid: true, error: null };
      };
      this.errors = {}

      const validFullName = validateFullName(this.user_name);
      this.errors.user_name = validFullName.error;
      if (this.valid) {
        this.valid = validFullName.valid
      }

      const validEmail = validateEmail(this.user_email);
      this.errors.user_email = validEmail.error;
      if (this.valid) {
        this.valid = validEmail.valid
      }

      const validMessage = validateMessage(this.message)
      this.errors.message = validMessage.error
      if (this.valid) {
        this.valid = validMessage.valid
      }
      if(validMessage.valid == true && validEmail.valid == true && validFullName.valid == true){
        this.sendMail();
      }
    }
  }
}
</script>

<style scoped>

  input[type="text"], input[type="email"], textarea {
    background-color : #F4F5F7;
    font-size: 1.25rem;
  }

  .floating-input>input::placeholder,
  .floating-input>textarea::placeholder {
    color: transparent;
  }

  .floating-input>input:focus,
  .floating-input>input:not(:placeholder-shown),
  .floating-input>textarea:focus,
  .floating-input>textarea:not(:placeholder-shown) { 
    @apply pt-8;
    color: #000; 
  }

  .floating-input>input:focus~label, 
  .floating-input>input:not(:placeholder-shown)~label,
  .floating-input>textarea:focus~label, 
  .floating-input>textarea:not(:placeholder-shown)~label {
    @apply scale-75 -translate-y-3 translate-x-1;
    color: #D2D3D5; 
  }

  .floating-input>textarea:focus~label, 
  .floating-input>textarea:not(:placeholder-shown)~label {
    @apply scale-75 -translate-y-6 translate-x-1;
    color: #D2D3D5; 
  }

  .text-red {
    color: #f14668;
  }

  .btn-send-disabled {
    background-color:hsl(0,0%,0%, 0.2);
  }
</style>