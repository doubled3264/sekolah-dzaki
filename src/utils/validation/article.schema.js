import { object, string } from 'yup'

export const articleSchema = object({
  title: string().trim().required(`judul tidak boleh kosong`),
  // image caption
  caption: string().trim().required(`caption tidak boleh kosong`),
})
