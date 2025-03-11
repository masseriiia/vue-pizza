import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const pinnia = createPinia()
const app = createApp(App)

app.use(pinnia)
app.use(router)
app.mount('#app')
