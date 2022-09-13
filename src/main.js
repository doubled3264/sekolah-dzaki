import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './routes'
import { store } from './store'
import './store/module/subscribe'
import './assets/style/index.scss'
import 'animate.css'

//axios
const mode = 'dev'
if (mode === 'dev') {
  axios.defaults.baseURL = 'http://localhost:3000/'
} else if (mode === 'prod') {
  axios.defaults.baseURL = ''
}

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  const app = createApp(App)
  app.use(router)
  app.use(store)
  app.mount('#app')
})
