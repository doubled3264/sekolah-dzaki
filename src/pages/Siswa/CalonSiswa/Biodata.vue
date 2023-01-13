<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { arrowRight, pencil, trash } from '../../../utils/svg-vars'
import { computed } from '@vue/reactivity'
import { setGender } from '../../../utils/etc.helper'
import id from 'date-fns/locale/id'
import { format, parse } from 'date-fns'
import Swal from 'sweetalert2'
import CustomIcon from '../../../components/CustomIcon.vue'
import CustomInfo from '../../../components/form/CustomInfo.vue'
const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
const route = useRoute()
const router = useRouter()
const calonSiswaId = ref(null)
const calonSiswaData = ref({})
onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
  calonSiswaId.value = route.params.id
  fetchCalonSiswa()
})

/**
 * fetch single calon siswa data on DB and get from store
 */
async function fetchCalonSiswa() {
  await store.dispatch('calonSiswa/getSingle', calonSiswaId.value)
  calonSiswaData.value = store.getters['calonSiswa/getSingle']
}

const getJenisKelamin = computed(() => {
  return setGender(calonSiswaData.value.jenis_kelamin)
})

const getTanggalLahir = computed(() => {
  if (calonSiswaData.value.tanggal_lahir) {
    const date = parse(
      calonSiswaData.value.tanggal_lahir,
      'yyyy-MM-dd',
      new Date()
    )
    return format(date, 'dd MMMM yyyy', { locale: id })
  }
})
function editAction() {
  router.push({
    name: 'edit calon siswa',
    params: { id: calonSiswaId.value },
  })
}
function deleteAction() {
  Swal.fire({
    title: 'Anda yakin ?',
    text: `Data "${calonSiswaData.value.nama}" akan dihapus.`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    cancelButtonColor: '#c82333',
    confirmButtonText: 'Ya, hapus !',
    confirmButtonColor: '#41c3a9',
  }).then(async (result) => {
    if (result.isConfirmed) {
      deleteCalonSiswa()
    }
  })
}

async function deleteCalonSiswa() {
  await store
    .dispatch('calonSiswa/delete', calonSiswaData.value)
    .then(() => {
      Swal.fire({
        icon: 'success',
        text: 'data berhasil dihapus',
        showConfirmButton: false,
        timer: 1500,
      })
      router.back()
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        text: 'data gagal dihapus',
        showConfirmButton: false,
        timer: 1500,
      })
    })
}
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <div class="content__head">
        <div class="content__path">
          <span>siswa</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span class="cursor-pointer" @click="$router.go(-1)">daftar calon siswa</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>biodata</span>
        </div>
        <div class="content__title">
          <h3>biodata calon siswa</h3>
        </div>
        <div class="content__body">
          <div class="card biodata-calon-siswa">
            <div class="card__head">
              <div class="card__title">biodata calon siswa</div>
              <div class="card__nav">
                <div class="icon__wrapper">
                  <CustomIcon :svg-icon="pencil" @click="editAction" />
                </div>
                <div class="icon__wrapper">
                  <CustomIcon :svg-icon="trash" @click="deleteAction" />
                </div>
              </div>
            </div>
            <div class="card__body">
              <div>
                <CustomInfo label="nama" :value="calonSiswaData.nama" />
              </div>
              <div class="flex">
                <div class="w-1/3">
                  <CustomInfo label="jenis kelamin" :value="getJenisKelamin" />
                </div>
                <div class="w-1/3">
                  <CustomInfo label="tempat lahir" :value="calonSiswaData.tempat_lahir" />
                </div>
                <div class="w-1/3">
                  <CustomInfo label="tanggal lahir" :value="getTanggalLahir" />
                </div>
              </div>
              <div class="flex">
                <div class="w-1/3">
                  <CustomInfo label="nama ayah" :value="calonSiswaData.nama_ayah" />
                </div>

                <div class="w-1/3">
                  <CustomInfo label="nama ibu" :value="calonSiswaData.nama_ibu" />
                </div>
                <div class="w-1/3">
                  <CustomInfo label="nomor telepon" :value="calonSiswaData.no_telepon" />
                </div>
              </div>
              <div>
                <CustomInfo label="alamat" :value="calonSiswaData.alamat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
