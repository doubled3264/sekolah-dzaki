import { createStore } from 'vuex'

import auth from './module/auth'
import invitation from './module/invitation'
import sidebar from './module/sidebar'
import windowProp from './module/window'
import vueTable from './module/vue-table'

import admin from './module/admin'
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
      invitation,
      sidebar,
      windowProp,
      vueTable,
      admin,
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
