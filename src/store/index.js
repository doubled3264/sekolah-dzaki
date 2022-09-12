import { createStore } from 'vuex'

import auth from './module/auth'
import sidebar from './module/sidebar'

export const store = createStore({ modules: { auth, sidebar } })
