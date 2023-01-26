const normalButton = {
   cancelButton: 'btn btn--md btn__link--secondary',
   confirmButton: 'btn btn--md btn--verdigris',
}
const dangerButton = {
   cancelButton: 'btn btn--md btn__link--secondary',
   confirmButton: 'btn btn--md btn--danger',
}

export const swalDialog = {
   preventClose: (text) => {
      return {
         title: 'Anda yakin ?',
         text: text,
         icon: 'warning',
         showCancelButton: true,
         cancelButtonText: 'Batal',
         confirmButtonText: 'Ya, tutup !',
         customClass: normalButton,
         buttonsStyling: false,
      }
   },
   confirm: (text) => {
      return {
         title: 'Anda yakin ?',
         text: text,
         icon: 'question',
         showCancelButton: true,
         cancelButtonText: 'Batal',
         confirmButtonText: 'Ya, simpan !',
         customClass: normalButton,
         buttonsStyling: false,
      }
   },
   delete: (text) => {
      return {
         title: 'Anda yakin ?',
         text: text,
         icon: 'warning',
         showCancelButton: true,
         cancelButtonText: 'Batal',
         confirmButtonText: 'Ya, hapus !',
         customClass: dangerButton,
         buttonsStyling: false,
      }
   },
   success: (text) => {
      return {
         icon: 'success',
         text: text,
         showConfirmButton: false,
         timer: 1500,
      }
   },
   error: (text) => {
      return {
         icon: 'warning',
         text: text,
         showConfirmButton: false,
         timer: 1500,
      }
   },
}
