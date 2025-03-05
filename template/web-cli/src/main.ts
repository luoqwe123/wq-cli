import './assets/main.css'

import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import svgComp from "@/components/glob/svgComponents.vue"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("svgComp",svgComp)
app.mount('#app')
