import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.directive('reveal', reveal)

app.mount('#app')
