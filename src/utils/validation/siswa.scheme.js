import { object, string, number } from 'yup'

export const siswaScheme = object({
   nama: object({
      value: string().trim().required('Nama tidak boleh kosong'),
   }),
   jenis_kelamin: object({
      value: string().trim().required('jenis kelamin tidak boleh kosong'),
   }),
   tempat_lahir: object({
      value: string().trim().required('tempat lahir tidak boleh kosong'),
   }),
   tanggal_lahir: object({
      value: string().trim().required('tanggal lahir tidak boleh kosong'),
   }),
   nama_ayah: object({
      value: string().trim().required('nama orang tua tidak boleh kosong'),
   }),
   nama_ibu: object({
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
   kelas: object({
      value: number('tidak boleh mengandung huruf').required(
         'kelas tidak boleh kosong'
      ),
   }),
})
