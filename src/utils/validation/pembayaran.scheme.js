import { object, string } from 'yup'

export const catatanScheme = object({
   isi_catatan: string().trim().required('isi catatan tidak boleh kosong'),
})
