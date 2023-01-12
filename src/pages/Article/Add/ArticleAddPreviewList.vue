<script setup>
import { computed, onMounted, ref } from 'vue'
import {
   arrowSolidDown,
   arrowSolidUp,
   trash,
   pencil,
} from '../../../utils/svg-vars'
import CustomIcon from '../../../components/CustomIcon.vue'
import CustomThreeDotOptionsList from '../../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../../components/CustomThreeDotOpions/OptionsItem.vue'

defineEmits([
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
   <div :style="{ maxHeight: availHeight + 'px' }" class="article-add__preview">
      <div class="article-add__preview-title">
         <h2>{{ article.title }}</h2>
      </div>
      <div class="article-add__preview-thumbnail">
         <img :src="getThumbnailImage" alt="" />
      </div>
      <ul class="article-add__preview-list">
         <li
            v-for="(item, index) in article.item"
            :key="index + 1"
            class="article-add__preview-item"
         >
            <div v-if="item.type === 'text'" class="text-content">
               <div class="text__wrapper" v-html="item.value"></div>
               <div
                  class="text-content__nav"
                  @mouseenter="$emit('toggleShowOptions', index)"
                  @mouseleave="$emit('toggleShowOptions', index)"
               >
                  <CustomThreeDotOptionsList :is-show="item.showOptions">
                     <CustomThreeDotOptionsItem>
                        <div
                           class="flex gap-4"
                           @click="$emit('editText', index)"
                        >
                           <CustomIcon :svg-icon="pencil" />
                           <p>ubah</p>
                        </div>
                     </CustomThreeDotOptionsItem>
                     <CustomThreeDotOptionsItem>
                        <div
                           class="flex gap-4"
                           @click="$emit('removeText', index)"
                        >
                           <CustomIcon :svg-icon="trash" />
                           <p>hapus</p>
                        </div>
                     </CustomThreeDotOptionsItem>
                  </CustomThreeDotOptionsList>
               </div>
            </div>
            <div v-if="item.type === 'image'" class="image-content">
               <div class="image__wrapper">
                  <img :src="item.value.preview" :alt="item.value.raw.name" />
               </div>
               <p>{{ item.value.caption }}</p>
               <div
                  class="image-content__nav"
                  @mouseenter="$emit('toggleShowOptions', index)"
                  @mouseleave="$emit('toggleShowOptions', index)"
               >
                  <CustomThreeDotOptionsList :is-show="item.showOptions">
                     <CustomThreeDotOptionsItem v-if="index != 0">
                        <div
                           class="flex gap-4"
                           @click="$emit('reorderingImage', index, 'go up')"
                        >
                           <CustomIcon :svg-icon="arrowSolidUp" />
                           <p>atas</p>
                        </div>
                     </CustomThreeDotOptionsItem>
                     <CustomThreeDotOptionsItem
                        v-if="index != article.item.length - 1"
                     >
                        <div
                           class="flex gap-4"
                           @click="$emit('reorderingImage', index, 'go down')"
                        >
                           <CustomIcon :svg-icon="arrowSolidDown" />
                           <p>bawah</p>
                        </div>
                     </CustomThreeDotOptionsItem>
                     <CustomThreeDotOptionsItem>
                        <div
                           class="flex gap-4"
                           @click="$emit('removeImage', index)"
                        >
                           <CustomIcon :svg-icon="trash" />
                           <p>hapus</p>
                        </div>
                     </CustomThreeDotOptionsItem>
                  </CustomThreeDotOptionsList>
               </div>
            </div>
         </li>
      </ul>
   </div>
</template>
