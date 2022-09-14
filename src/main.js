import { createApp } from 'vue'
import axios from 'axios'
import { SetupCalendar } from 'v-calendar'
import App from './App.vue'
import router from './routes'
import { store } from './store'
import './store/module/subscribe'
import 'animate.css'
import 'v-calendar/dist/style.css';
import 'vue3-treeselect/dist/vue3-treeselect.css'
import './assets/style/index.scss'

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
  app.use(SetupCalendar, {})
  app.mount('#app')
})
