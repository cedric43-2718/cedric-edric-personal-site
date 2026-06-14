import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStorage } from '@vueuse/core'

import App from './App.vue'
import router from './router'

import { plugin as VueTippy } from 'vue-tippy';
import 'tippy.js/dist/tippy.css'; // Essential base styles

// Vue.config.ignoredElements = [ 'css-doodle' ]

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueTippy, {
  defaultProps: { placement: 'top' }, 
});

// const theme = useStorage('theme-setting', 'light')
// app.provide('theme', theme)

app.mount('#app')
