import { string, object } from 'yup'

export const loginScheme = object({
   email: string()
      .email('Email tidak valid')
      .trim()
      .required('Email tidak boleh kosong'),
   password: string().trim().required('Password tidak boleh kosong'),
})
