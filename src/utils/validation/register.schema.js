import { object, string, number } from 'yup'

export const registerSchema = object({
  email: string()
    .email('email tidak valid')
    .trim()
    .required('email tidak boleh kosong'),
  password: string()
    .trim()
    .required('password tidak boleh kosong')
    .min(6, 'password terlalu pendek'),
  confirmPassword: string()
    .trim()
    .required('konfirmasi password tidak boleh kosong')
    .test('password-check', 'password tidak cocok', (value, ctx) => {
      return ctx.parent.password == value
    }),
  nama: string().trim().required('nama tidak boleh kosong'),
  no_telepon: number()
    .required('no telepon tidak boleh kosong')
    .typeError('no telepon tidak valid'),
})
