<script setup>
import { ref } from 'vue'

import { VueGoodTable } from 'vue-good-table-next'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeaderVue from '../../components/layouts/header/CustomHeader.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'

const tableData = ref({
  columns: [
    {
      label: 'No',
      field: 'nomor',
      type: 'number',
      thClass: 'text-left !w-16',
      tdClass: 'text-left !pl-5',
    },
    {
      label: 'Nama',
      field: 'nama',
      thClass: 'text-left',
    },
    {
      label: 'Tanggal Lahir',
      field: 'tanggal_lahir',
      type: 'date',
      dateInputFormat: 'yyyy-MM-dd',
      dateOutputFormat: 'MMM do yy',
      thClass: 'text-left',
    },
    {
      label: 'Jenis Kelamin',
      field: 'jenis_kelamin',
      thClass: 'text-left',
    },
    {
      label: 'Nama Orang Tua',
      field: 'nama_orang_tua',
      thClass: 'text-left',
    },
    {
      label: 'Alamat',
      field: 'alamat',
      thClass: 'text-left',
    },
  ],
  rows: [
    {
      nomor: 1,
      nama: 'maman',
      tanggl_lahir: '2011-10-31',
      jenis_kelamin: 'laki-laki',
      nama_orang_tua: 'indro',
      alamat: 'saguling',
    },
    {
      nomor: 2,
      nama: 'maman',
      tanggl_lahir: '2011-10-31',
      jenis_kelamin: 'laki-laki',
      nama_orang_tua: 'indro',
      alamat: 'saguling',
    },
    {
      nomor: 3,
      nama: 'maman',
      tanggl_lahir: '2011-10-31',
      jenis_kelamin: 'laki-laki',
      nama_orang_tua: 'indro',
      alamat: 'saguling',
    },
    {
      nomor: 4,
      nama: 'maman',
      tanggl_lahir: '2011-10-31',
      jenis_kelamin: 'laki-laki',
      nama_orang_tua: 'indro',
      alamat: 'saguling',
    },
    {
      nomor: 5,
      nama: 'maman',
      tanggl_lahir: '2011-10-31',
      jenis_kelamin: 'laki-laki',
      nama_orang_tua: 'indro',
      alamat: 'saguling',
    },
    /* { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 }, */
    /* { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 }, */
    /* { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 }, */
    /* { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 }, */
    /* { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 }, */
  ],
})
</script>
<template>
  <Sidebar />
  <div class="content">
    <div class="wrapper">
      <div class="row my-10">
        <h4 class="capitalize font-semibold text-xl">data siswa</h4>
      </div>
      <div class="table-data">
        <vue-good-table :columns="tableData.columns" :rows="tableData.rows" />
      </div>
    </div>
  </div>
</template>
