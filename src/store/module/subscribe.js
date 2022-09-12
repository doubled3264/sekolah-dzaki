import { store } from '../'
import axios from 'axios'

export default store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/setToken':
      // check if mutation have payload
      if (mutation.payload) {
        axios.defaults.headers.common['Authorization'] = mutation.payload
        console.log(mutation.payload)
        localStorage.setItem('token', mutation.payload)
      } else {
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('token')
      }
      break
  }
})
