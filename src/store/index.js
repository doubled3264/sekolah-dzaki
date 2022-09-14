import { createStore } from 'vuex'

import auth from './module/auth'
import sidebar from './module/sidebar'
import windowProp from './module/window'

export const store = createStore({ modules: { auth, sidebar, windowProp } })
