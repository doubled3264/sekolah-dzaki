import { object, string, number } from 'yup'
export const iuranScheme = object({
   nama: object({
      value: string().trim().required('nama tidak boleh kosong'),
   }),
   keterangan: object({
      value: string().trim().required('nominal tidak boleh kosong'),
   }),
   nominal: object({
      value: number().required('nominal tidak boleh kosong'),
   }),
   interval: object({
      value: string().trim().required('interval tidak boleh kosong'),
   }),
})
