import { createStore } from 'vuex'

import sidebar from './module/sidebar'

export const store = createStore({ modules: { sidebar } })
