<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import {
   arrowSolidDown,
   arrowSolidUp,
   trash,
   pencil,
   imageEdit,
} from '../../../utils/svg-vars'
import CustomIcon from '../../../components/CustomIcon.vue'
import CustomKebabMenuList from '../../../components/CustomKebabMenu/CustomKebabMenuList.vue'
import CustomKebabMenuItem from '../../../components/CustomKebabMenu/CustomKebabMenuItem.vue'

defineEmits([
   'editImage',
   'editText',
   'removeText',
   'reorderingImage',
   'removeImage',
   'toggleShowOptions',
])
const props = defineProps({
   article: {
      type: Object,
      default: {
         title: '',
         thumbnailImage: null,
         item: [],
      },
   },
})
/** @type {Number} max height for wrapper  */
const availHeight = ref(0)
/**
 * convert raw image to blob
 * @returns {Blob} image
 */
const getThumbnailImage = computed(() => {
   if (props.article.thumbnailImage) {
      return URL.createObjectURL(props.article.thumbnailImage)
   }
   return ''
})

onMounted(() => {
   availHeight.value = window.innerHeight - (32 + 24 + 20 + 36 + 142 + 12)
})
</script>
<template>
   <div :style="{ maxHeight: availHeight + 'px' }" class="preview__wrapper">
      <div class="preview__title">
         <h2>{{ article.title }}</h2>
      </div>
      <div class="preview__thumbnail">
         <img :src="getThumbnailImage" alt="" />
      </div>
      <ul class="preview__list">
         <li
            v-for="(item, index) in article.item"
            :key="index + 1"
            class="preview__item"
         >
            <div v-if="item.type === 'text'" class="text-content">
               <div v-html="item.content"></div>
               <div
                  class="preview__item-nav"
                  @mouseenter="$emit('toggleShowOptions', index)"
                  @mouseleave="$emit('toggleShowOptions', index)"
               >
                  <CustomKebabMenuList :is-show="item.showOptions">
                     <CustomKebabMenuItem @on-click="$emit('editText', index)">
                        <CustomIcon :svg-icon="pencil" />
                        <p>ubah</p>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem
                        @on-click="$emit('removeText', index)"
                     >
                        <CustomIcon :svg-icon="trash" />
                        <p>hapus</p>
                     </CustomKebabMenuItem>
                  </CustomKebabMenuList>
               </div>
            </div>
            <div v-if="item.type === 'image'" class="image-content">
               <div class="image-content__wrapper">
                  <img
                     :src="item.content.preview"
                     :alt="item.content.raw.name"
                  />
               </div>
               <p>{{ item.content.caption }}</p>
               <div
                  class="preview__item-nav"
                  @mouseenter="$emit('toggleShowOptions', index)"
                  @mouseleave="$emit('toggleShowOptions', index)"
               >
                  <CustomKebabMenuList :is-show="item.showOptions">
                     <CustomKebabMenuItem
                        v-if="index != 0"
                        @on-click="$emit('reorderingImage', index, 'go up')"
                     >
                        <CustomIcon :svg-icon="arrowSolidUp" />
                        <p>atas</p>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem
                        v-if="index != article.item.length - 1"
                        @on-click="$emit('reorderingImage', index, 'go down')"
                     >
                        <CustomIcon :svg-icon="arrowSolidDown" />
                        <p>bawah</p>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem @on-click="$emit('editImage', index)">
                        <CustomIcon :svg-icon="imageEdit" />
                        <p>Ubah</p>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem
                        @on-click="$emit('removeImage', index)"
                     >
                        <CustomIcon :svg-icon="trash" />
                        <p>hapus</p>
                     </CustomKebabMenuItem>
                  </CustomKebabMenuList>
               </div>
            </div>
         </li>
      </ul>
   </div>
</template>
