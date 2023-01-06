export const articleDialog = {
  preventClose: {
    title: 'Anda yakin ?',
    text: `Artikel yang sudah diketik akan terhapus.`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: 'Ya, keluar !',
    customClass: {
      cancelButton: 'btn btn--md btn__link--secondary',
      confirmButton: 'btn btn--md btn--verdigris',
    },
    buttonsStyling: false,
  },
  deleteImage: {
    title: 'Anda yakin ?',
    text: `Gambar akan dihapus.`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: 'Ya, hapus !',
    customClass: {
      cancelButton: 'btn btn--md btn__link--secondary',
      confirmButton: 'btn btn--md btn--danger',
    },
    buttonsStyling: false,

  }
}
