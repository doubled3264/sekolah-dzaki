import _ from 'lodash'

export default {
   namespaced: true,
   state: {
      'riwayat-pembayaran': {
         columns: [
            {
               label: 'no',
               field: 'no',
               type: 'number',
               width: '70px',
            },
            {
               label: 'nama',
               field: 'nama',
            },
            {
               label: 'keterangan',
               field: 'keterangan',
            },
            {
               label: 'tahun ajaran',
               field: 'tahun_ajaran',
            },
            {
               label: 'nominal',
               field: 'nominal',
            },
            {
               label: 'status',
               field: 'status',
            },
         ],
      },
      siswa: {
         columns: [
            {
               label: 'No',
               field: 'no',
               type: 'number',
               thClass: 'text-left',
               tdClass: 'text-left',
               width: '70px',
            },
            {
               label: 'No Induk',
               field: 'no_induk',
               thClass: 'text-left ',
               tdClass: 'cursor-pointer ',
               width: '120px',
            },
            {
               label: 'NISN',
               field: 'nisn',
               thClass: 'text-left',
               hidden: true,
            },
            {
               label: 'NIK',
               field: 'nik',
               thClass: 'text-left',
               hidden: true,
            },
            {
               label: 'Nama',
               field: 'nama',
               thClass: 'text-left',
               tdClass: 'cursor-pointer',
            },
            {
               label: 'Jenis Kelamin',
               field: 'jenis_kelamin',
               thClass: 'text-left',
               tdClass: 'cursor-pointer',
               width: '170px',
            },
            {
               label: 'Tempat Lahir',
               field: 'tempat_lahir',
               thClass: 'text-left',
               hidden: true,
            },
            {
               label: 'Tanggal Lahir',
               field: 'tanggal_lahir',
               type: 'date',
               dateInputFormat: 'yyyy-MM-dd',
               dateOutputFormat: 'MMM do yy',
               thClass: 'text-left',
               hidden: true,
            },
            {
               label: 'Nama Ayah',
               field: 'nama_ayah',
               thClass: 'text-left',
               hidden: true,
            },
            {
               label: 'Nama Ibu',
               field: 'nama_ibu',
               thClass: 'text-left',
               hidden: true,
            },
            {
               label: 'No Telepon',
               field: 'no_telepon',
               thClass: 'text-left',
               tdClass: 'cursor-pointer',
               width: '170px',
            },
            {
               label: 'Alamat',
               field: 'alamat',
               thClass: 'text-left',
               tdClass: 'cursor-pointer',
            },
         ],
      },
      iuran: {
         columns: [
            {
               label: 'No',
               field: 'no',
               type: 'number',
               thClass: 'text-left !w-16',
               tdClass: 'text-left !pl-5',
            },
            {
               label: 'ID Iuran',
               field: 'id_iuran',
               hidden: true,
               thClass: 'text-left',
            },
            {
               label: 'ID Variant',
               field: 'variant',
               hidden: true,
               thClass: 'text-left',
            },
            {
               label: 'Nama',
               field: 'nama',
               thClass: 'text-left',
            },
            {
               label: 'Keterangan',
               field: 'keterangan',
               thClass: 'text-left',
            },
            {
               label: 'Nominal',
               field: 'nominal',
               type: 'number',
               thClass: 'text-left',
            },
            {
               label: 'Interval',
               field: 'interval',
               thClass: 'text-left',
            },
            {
               label: 'Interval Detail',
               field: 'interval_detail',
               thClass: 'text-left',
            },
            // {
            //    label: 'Inklusi',
            //    field: 'inklusi',
            //    thClass: 'text-left',
            // },
         ],
      },
   },
   getters: {
      getColumn: (state) => (tableName) => {
         return state[tableName].columns
      },
   },
}
