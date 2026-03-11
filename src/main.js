import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vue.config.ignoredElements = [ 'css-doodle' ]

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
