import { createStore } from 'vuex'

import auth from './module/auth'
import sidebar from './module/sidebar'
import windowProp from './module/window'
import vueTable from './module/vue.table'

import siswa from './module/siswa'
import iuran from './module/iuran'
import variantIuran from './module/variant-iuran'
import catatan from './module/catatan'

export const store = createStore({
   modules: {
      auth,
      sidebar,
      windowProp,
      vueTable,
      siswa,
      iuran,
      variantIuran,
      catatan,
   },
})
