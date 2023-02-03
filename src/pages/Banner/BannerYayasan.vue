<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { forEach } from 'lodash'
import { pick } from '../../utils/object-helper'
import {
   arrowSolidDown,
   arrowSolidUp,
   imageAdd,
   imageEdit,
   trash,
} from '../../utils/svg-vars'
import Swal from 'sweetalert2'
import { swalDialog } from '../../utils/sweetalert-object'
import ContentHead from '../../components/Content/ContentHead.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import CustomKebabMenuList from '../../components/CustomKebabMenu/CustomKebabMenuList.vue'
import CustomKebabMenuItem from '../../components/CustomKebabMenu/CustomKebabMenuItem.vue'
import AddNewImage from '../../components/modal/Banner/AddNewImage.vue'
import Spinner from '../../components/modal/Spinner.vue'

const store = useStore()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
   parentItem: String,
   childItem: String,
   placement: String,
   contentHeadItem: Array,
})
const banner = ref('')
/** @type {Object} content head value */
/* const contentHeadItem = [ */
/*   { title: 'banner', path: '#' }, */
/*   { title: 'banner yayasan', path: '' }, */
/* ] */
const spinnerState = ref(false)
const cardMenu = ref(false)
/** @type {Object} modal state  */
const modal = ref({
   imageEditor: false,
})
/** @type {String} text editor purpose value, add | edit  */
const imageEditorPurpose = ref(null)
const imageToEdit = ref({
   raw: null,
   preview: null,
   link: null,
   index: null,
})

/** @type {Number} max height for wrapper  */
const availHeight = ref(0)
onMounted(async () => {
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
   availHeight.value = window.innerHeight - (32 + 24 + 20 + 36 + 142 + 12)
   await fetchBanner()
})
async function fetchBanner() {
   await store.dispatch('banner/get')
   banner.value = store.getters['banner/get'](props.placement)
   forEach(banner.value, (item, index) => {
      banner.value[index].showOptions = false
   })
}
function spinner(toggle) {
   if (toggle == 'on') {
      spinnerState.value = true
   } else if (toggle == 'off') {
      spinnerState.value = false
   }
}
/**
 * toggle modal form
 * @param {String} modal name
 */
function toggleModal(modalName) {
   modal.value[modalName] = !modal.value[modalName]
}
function toggleCardMenu() {
   cardMenu.value = !cardMenu.value
}

function toggleShowOptions(bannerIndex) {
   banner.value[bannerIndex].showOptions =
      !banner.value[bannerIndex].showOptions
}

function addNewBanner() {
   imageEditorPurpose.value = 'add'
   toggleModal('imageEditor')
}

function editBanner(bannerIndex) {
   imageEditorPurpose.value = 'edit without raw'
   imageToEdit.value.preview = `http://localhost:3000/files/banner/${banner.value[bannerIndex].placement}/${banner.value[bannerIndex].banner}`
   imageToEdit.value.link = banner.value[bannerIndex].link
   imageToEdit.value.index = bannerIndex
   toggleModal('imageEditor')
}
/**
 * prevent accidentally close add image modal
 */
function closeImageModal() {
   Swal.fire(swalDialog.preventClose('Gambar yang dipilih akan terhapus')).then(
      async (result) => {
         if (result.isConfirmed) {
            imageEditorPurpose.value = null
            toggleModal('imageEditor')
         }
      }
   )
}

async function pushNewImage(imageObject) {
   Swal.fire(swalDialog.confirm('Simpan banner.')).then(async (result) => {
      if (result.isConfirmed) {
         let bannerItem = {
            raw: imageObject.raw,
            link: imageObject.link,
            placement: 'yayasan',
         }
         spinner('on')
         await store
            .dispatch('banner/add', bannerItem)
            .then(async () => {
               Swal.fire(swalDialog.success('Banner berhasil ditambahkan.'))
               await fetchBanner()
            })
            .catch(() => {
               Swal.fire(swalDialog.error('Terjadi kesalahan.'))
            })
         imageEditorPurpose.value = null
         toggleModal('imageEditor')
         spinner('off')
      }
   })
}
async function pushEditedImage(bannerObject, bannerIndex) {
   let bannerItem = {
      id: banner.value[bannerIndex].id,
      link: bannerObject.link,
      placement: banner.value[bannerIndex].placement,
      withImage: false,
   }
   if (bannerObject.raw != '') {
      bannerItem.withImage = true
      bannerItem.raw = bannerObject.raw
      bannerItem.itemToDelete = banner.value[bannerIndex].banner
   }
   Swal.fire(swalDialog.confirm('Simpan perubahan.')).then(async (result) => {
      if (result.isConfirmed) {
         spinner('on')
         await store
            .dispatch('banner/edit', bannerItem)
            .then(async () => {
               Swal.fire(swalDialog.success('Banner berhasil diubah.'))
               await fetchBanner()
            })
            .catch((err) => {
               console.log(err)
               Swal.fire(swalDialog.error('Terjadi kesalahan.'))
            })
         imageEditorPurpose.value = 'add'
         toggleModal('imageEditor')
         spinner('off')
      }
   })
}
/**
 * open text editor for edit text
 * @param {String} index | index of item
 * @param {String} order | go up | go down
 */
async function reorderingBanner(bannerIndex, order) {
   let bannerItem = {
      id: banner.value[bannerIndex].id,
      placement: banner.value[bannerIndex].placement,
      order: order,
   }
   Swal.fire(swalDialog.confirm('Pindahkan urutan banner.')).then(
      async (result) => {
         if (result.isConfirmed) {
            spinner('on')
            await store
               .dispatch('banner/reordering', bannerItem)
               .then(async () => {
                  Swal.fire(
                     swalDialog.success('Urutan banner berhasil diubah.')
                  )
                  await fetchBanner()
               })
               .catch(() => {
                  Swal.fire(swalDialog.error('Terjadi kesalahan.'))
               })
            spinner('off')
         }
      }
   )
}
async function removeBanner(bannerIndex) {
   let bannerItem = pick(banner.value[bannerIndex], 'id', 'placement')
   Swal.fire(swalDialog.delete('Banner terpilih akan dihapus.')).then(
      async (result) => {
         if (result.isConfirmed) {
            await store
               .dispatch('banner/remove', bannerItem)
               .then(async () => {
                  Swal.fire(swalDialog.success('Banner berhasil dihapus.'))
                  await fetchBanner()
               })
               .catch(() => {
                  Swal.fire(swalDialog.error('Terjadi kesalahan.'))
               })
         }
      }
   )
}
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <ContentHead :items="contentHeadItem" />
         <div class="content__body">
            <div class="banner__wrapper">
               <div class="card">
                  <div class="card__head">
                     <div class="card__title">
                        <h3>banner yayasan</h3>
                     </div>
                     <div
                        class="card__nav"
                        @mouseenter="toggleCardMenu"
                        @mouseleave="toggleCardMenu"
                     >
                        <CustomKebabMenuList :is-show="cardMenu">
                           <CustomKebabMenuItem>
                              <div class="flex gap-4" @click="addNewBanner">
                                 <CustomIcon :svg-icon="imageAdd" />
                                 <p>tambahkan banner baru</p>
                              </div>
                           </CustomKebabMenuItem>
                        </CustomKebabMenuList>
                     </div>
                  </div>
                  <div
                     :style="{ maxHeight: availHeight + 'px' }"
                     class="card__body"
                  >
                     <ul class="banner__image-list">
                        <li
                           v-for="(item, index) in banner"
                           :key="index + 1"
                           class="banner__image-item"
                        >
                           <div class="image-content">
                              <img
                                 crossorigin="anonymous"
                                 :src="`http://localhost:3000/files/banner/${item.placement}/${item.banner}`"
                                 alt=""
                              />
                           </div>
                           <div
                              class="image-content__nav"
                              @mouseenter="toggleShowOptions(index)"
                              @mouseleave="toggleShowOptions(index)"
                           >
                              <CustomKebabMenuList :is-show="item.showOptions">
                                 <CustomKebabMenuItem
                                    v-show="index != 0"
                                    @on-click="reorderingBanner(index, 'go up')"
                                 >
                                    <CustomIcon :svg-icon="arrowSolidUp" />
                                    <p>pindah ke atas</p>
                                 </CustomKebabMenuItem>
                                 <CustomKebabMenuItem
                                    v-show="index != banner.length - 1"
                                    @on-click="
                                       reorderingBanner(index, 'go down')
                                    "
                                 >
                                    <CustomIcon :svg-icon="arrowSolidDown" />
                                    <p>pindah ke bawah</p>
                                 </CustomKebabMenuItem>
                                 <CustomKebabMenuItem
                                    @on-click="editBanner(index)"
                                 >
                                    <CustomIcon :svg-icon="imageEdit" />
                                    <p>ubah</p>
                                 </CustomKebabMenuItem>
                                 <CustomKebabMenuItem
                                    @on-click="removeBanner(index)"
                                 >
                                    <CustomIcon :svg-icon="trash" />
                                    <p>hapus</p>
                                 </CustomKebabMenuItem>
                              </CustomKebabMenuList>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <Teleport to="#modal">
      <CustomModalOverlay
         v-show="modal.imageEditor"
         @close-modal="closeImageModal"
      >
         <AddNewImage
            :image-to-edit="imageToEdit"
            :purpose="imageEditorPurpose"
            @on-close-modal="closeImageModal"
            @on-add-image="pushNewImage"
            @on-edit-image="pushEditedImage"
         />
      </CustomModalOverlay>
   </Teleport>
   <CustomModalOverlay v-if="spinnerState">
      <Spinner :is-active="spinnerState" />
   </CustomModalOverlay>
</template>
