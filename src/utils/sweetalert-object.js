const normalButton = {
  cancelButton: 'btn btn--md btn__link--secondary',
  confirmButton: 'btn btn--md btn--verdigris',
}
const dangerButton = {
  cancelButton: 'btn btn--md btn__link--secondary',
  confirmButton: 'btn btn--md btn--danger',
}

export const articleDialog = {
  preventClose: {
    title: 'Anda yakin ?',
    text: `Artikel yang sudah diketik akan terhapus.`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: 'Ya, kembali !',
    customClass: normalButton,
    buttonsStyling: false,
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
}
