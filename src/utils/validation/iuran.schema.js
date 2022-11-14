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
  data: object({
    nama: string().trim().required(`nama iuran tidak boleh kosong`),
    // nominal: number()
    //    .required('nominal tidak boleh kosong')
    //    .typeError('nominal tidak valid'),
    interval: string().nullable(true).required('Interval tidak boleh kosong'),
    interval_detail: string()
      .nullable(true)
      .when('interval', {
        is: (value) => value === 'sekali',
        then: string()
          .nullable(true)
          .required('keterangan interval tidak boleh kosong'),
        otherwise: '',
      }),
  }),
  detail: object({
    nama: string().trim().required(`nama iuran tidak boleh kosong`),
    nominal: number()
      .required('nominal tidak boleh kosong')
      .typeError('nominal tidak valid'),
  }),
})
