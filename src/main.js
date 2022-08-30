import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import './assets/style/index.scss'

createApp(App).use(router).mount('#app')

const maman = () => {
  console.log()
}
