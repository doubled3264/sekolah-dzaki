import { object, string, number } from 'yup'

export const siswaScheme = object({
   nama: string().trim().required('Nama tidak boleh kosong'),
   jenis_kelamin: string().trim().required('jenis kelamin tidak boleh kosong'),
   tempat_lahir: string().trim().required('tempat lahir tidak boleh kosong'),
   tanggal_lahir: string().trim().required('tanggal lahir tidak boleh kosong'),
   nama_ayah: string().trim().required('nama orang tua tidak boleh kosong'),
   nama_ibu: string().trim().required('nama orang tua tidak boleh kosong'),
   no_telepon: string().trim().required('no telepon tidak boleh kosong'),
   alamat: string().trim().required('alamat tidak boleh kosong'),
   inklusi: string().trim().required('status inklusi tidak boleh kosong'),
   kelas: number()
      .required('kelas tidak boleh kosong')
      .typeError('kelas tidak valid')
      .min(1, 'kelas tidak valid')
      .max(9, 'kelas tidak valid'),
})
