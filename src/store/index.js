import { createStore } from 'vuex'

import auth from './module/auth'
import sidebar from './module/sidebar'
import windowProp from './module/window'
import vueTable from './module/vue-table'

import article from './module/article'
import banner from './module/banner'

import calonSiswa from './module/calon-siswa'
import siswa from './module/siswa'
import iuran from './module/iuran'
import variantIuran from './module/variant-iuran'
import catatan from './module/catatan'
import pembayaran from './module/pembayaran'
import transaksi from './module/transaksi'

export const store = createStore({
   modules: {
      auth,
      sidebar,
      windowProp,
      vueTable,
      article,
      banner,
      calonSiswa,
      siswa,
      iuran,
      variantIuran,
      catatan,
      pembayaran,
      transaksi,
   },
})
