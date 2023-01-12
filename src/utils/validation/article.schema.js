import { object, string } from 'yup'

export const articleSchema = object({
   title: string().trim().required(`judul tidak boleh kosong`),
   category: string().required('kategori tidak boleh kosong').nullable(true),
   placement: string().required('penempatan tidak boleh kosong').nullable(true),
   // image caption
   caption: string().trim().required(`caption tidak boleh kosong`),
})
