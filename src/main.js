import { createApp } from 'vue'
import axios from 'axios'
import { SetupCalendar } from 'v-calendar'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'
import router from './routes'
import { store } from './store'
// import './store/module/subscribe'
import 'animate.css'
import 'v-calendar/dist/style.css'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import './assets/style/index.scss'

axios.defaults.baseURL = import.meta.env.VITE_APIURL
axios.defaults.headers.post['Content-Type'] =
   'application/x-www-form-urlencoded'
console.log(import.meta.env.VITE_CHECKMODE)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(SetupCalendar, {})
app.use(VueSweetalert2)
app.mount('#app')
