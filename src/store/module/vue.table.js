import _ from 'lodash'

export default {
   namespaced: true,
   state: {
      iuran: {
         columns: [
            {
               label: 'No',
               field: 'nomor',
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
