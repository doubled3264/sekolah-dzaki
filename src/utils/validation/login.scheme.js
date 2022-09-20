import { string, object } from 'yup'

export const loginScheme = object({
  email: object({
    value: string()
      .email('Email tidak valid')
      .trim()
      .required('Email tidak boleh kosong'),
  }),
  password: object({
    value: string().trim().required('Password tidak boleh kosong'),
  }),
})
