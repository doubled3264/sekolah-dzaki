<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { imageAdd } from '../../utils/svg-vars'
import Swal from 'sweetalert2'
import { swalDialog } from '../../utils/sweetalert-object'
import ContentHead from '../../components/Content/ContentHead.vue'
import CustomThreeDotOptionsList from '../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../components/CustomThreeDotOpions/OptionsItem.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomModalOverlay from '../../components/CustomModalOverlay.vue'
import AddNewImage from '../../components/modal/Banner/AddNewImage.vue'
import Spinner from '../../components/modal/Spinner.vue'

const store = useStore()
/** @type {Object} parent & child sidebar item value for active state  */
const props = defineProps({
   parentItem: String,
   childItem: String,
})
const banner = ref('')
/** @type {Object} content head value */
const contentHeadItem = [
   { title: 'banner', path: '#' },
   { title: 'banner yayasan', path: '' },
]
const spinnerState = ref(false)
const mainMenuState = ref(false)
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
onMounted(async () => {
   store.commit('sidebar/setAllToNormal')
   store.commit('sidebar/setActiveParent', props.parentItem)
   store.commit('sidebar/setActiveChild', {
      parent: props.parentItem,
      itemToActive: props.childItem,
   })
   await fetchBanner()
})
async function fetchBanner() {
   await store.dispatch('banner/get')
   banner.value = store.getters['banner/get']('yayasan')
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

function addNewBanner() {
   imageEditorPurpose.value = 'add'
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
               /* router.push({ */
               /*    name: 'article detail', */
               /*    params: { id: uuid }, */
               /* }) */
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
function pushEditedImage() {}
</script>
<template>
   <div class="content">
      <div class="content__inner">
         <ContentHead :items="contentHeadItem" />
         <div class="content__body">
            <div class="card">
               <div class="card__head">
                  <div class="card__title">
                     <h3>banner yayasan</h3>
                  </div>
                  <div
                     class="card__nav article-detail"
                     @mouseenter="mainMenuState = !mainMenuState"
                     @mouseleave="mainMenuState = !mainMenuState"
                  >
                     <CustomThreeDotOptionsList :is-show="mainMenuState">
                        <CustomThreeDotOptionsItem>
                           <div class="flex gap-4" @click="addNewBanner">
                              <CustomIcon :svg-icon="imageAdd" />
                              <p>tambahkan banner baru</p>
                           </div>
                        </CustomThreeDotOptionsItem>
                     </CustomThreeDotOptionsList>
                  </div>
               </div>
               <div class="card__body">
                  <ul class="banner__image-list">
                     <li
                        v-for="(item, index) in banner"
                        :key="index + 1"
                        class="banner__image-item"
                     >
                        <img
                           crossorigin="anonymous"
                           :src="`http://localhost:3000/files/banner/${item.banner}`"
                           alt=""
                        />
                     </li>
                  </ul>
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
         />
      </CustomModalOverlay>
   </Teleport>
   <CustomModalOverlay v-if="spinnerState">
      <Spinner :is-active="spinnerState" />
   </CustomModalOverlay>
</template>
