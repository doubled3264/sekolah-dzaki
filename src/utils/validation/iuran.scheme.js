import { object, string, number } from 'yup'
export const iuranScheme = object({
   nama: string().trim().required('nama tidak boleh kosong'),
   nominal: number()
      .required('nominal tidak boleh kosong')
      .typeError('kelas tidak valid'),
   interval: string().trim().required('interval tidak boleh kosong'),
})
