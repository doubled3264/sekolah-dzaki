import { object, string, number } from 'yup'
// export const iuranScheme = object({
//    nama: string().trim().required('nama tidak boleh kosong'),
//    nominal: number()
//       .required('nominal tidak boleh kosong')
//       .typeError('nominal tidak valid'),
//    interval: string().trim().required('interval tidak boleh kosong'),
// })

// export const iuranExistScheme = object({
//    nominal: number()
//       .required('nominal tidak boleh kosong')
//       .typeError('nominal tidak valid'),
// })
//
export const iuranScheme = object({
  nama: string().trim().required('nama iuran tidak boleh kosong'),
  // nominal: number()
  //    .required('nominal tidak boleh kosong')
  //    .typeError('nominal tidak valid'),
  interval: string().required('Interval tidak boleh kosong').nullable(true),
  interval_detail: string().nullable(true),
})