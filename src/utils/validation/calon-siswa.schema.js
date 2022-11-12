import { object, string, number } from 'yup'

export const calonSiswaSchema = object({
   nama: string().trim().required('Nama tidak boleh kosong'),
   jenis_kelamin: string()
      .required('Jenis kelamin tidak boleh kosong')
      .nullable(true),
   tempat_lahir: string().trim().required('Tempat Lahir tidak boleh kosong'),
   tanggal_lahir: string().required('Tanggal lahir tidak boleh kosong'),
   alamat: string().trim().required('Alamat tidak boleh kosong'),
   nama_ayah: string().trim().required('Nama ayah tidak boleh kosong'),
   nama_ibu: string().trim().required('Nama ibu tidak boleh kosong'),
   no_telepon: number()
      .required('no telepon tidak boleh kosong')
      .typeError('no telepon tidak valid'),
})
