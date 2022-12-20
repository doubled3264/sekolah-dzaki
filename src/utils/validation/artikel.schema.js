import { object, string } from 'yup'

export const artikelSchema = object({
  title: string().trim().required(`judul tidak boleh kosong`),
})
