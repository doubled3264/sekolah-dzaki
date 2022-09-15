import { object, string } from 'yup'

export const siswaScheme = object({
  nama: object({
    value: string().trim().required('Nama tidak boleh kosong'),
  }),
  tanggal_lahir: object({
    value: string().trim().required('tanggal lahir tidak boleh kosong'),
  }),
  jenis_kelamin: object({
    value: string().trim().required('jenis kelamin tidak boleh kosong'),
  }),
  nama_orang_tua: object({
    value: string().trim().required('nama orang tua tidak boleh kosong'),
  }),
  no_telepon: object({
    value: string().trim().required('no telepon tidak boleh kosong'),
  }),
  alamat: object({
    value: string().trim().required('alamat tidak boleh kosong'),
  }),
  inklusi: object({
    value: string().trim().required('status inklusi tidak boleh kosong'),
  }),
})
