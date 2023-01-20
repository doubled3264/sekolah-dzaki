<script setup>
import { computed, onMounted, ref } from 'vue'
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

const props = defineProps({
   article: {
      type: Object,
      default: {
         title: '',
         thumbnail: '',
         ArticleDetails: [],
      },
   },
})
defineEmits([
   'editText',
   'removeText',
   'editImage',
   'removeImage',
   'reorderingImage',
   'toggleShowOptions',
])
const availHeight = ref(0)
const getThumbnailImage = computed(() => {
   if (props.article) {
      return `http://localhost:3000/files/article/${props.article.id}/${props.article.thumbnail}`
   }
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
         <img crossorigin="anonymous" :src="getThumbnailImage" alt="" />
      </div>
      <ul class="preview__list">
         <li
            v-for="(item, index) in article.ArticleDetails"
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
                     <CustomKebabMenuItem>
                        <div
                           class="flex gap-4"
                           @click="$emit('editText', index)"
                        >
                           <CustomIcon :svg-icon="pencil" />
                           <p>ubah</p>
                        </div>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem>
                        <div
                           class="flex gap-4"
                           @click="$emit('removeText', index)"
                        >
                           <CustomIcon :svg-icon="trash" />
                           <p>hapus</p>
                        </div>
                     </CustomKebabMenuItem>
                  </CustomKebabMenuList>
               </div>
            </div>
            <div v-if="item.type === 'image'" class="image-content">
               <div class="image-content__wrapper">
                  <img
                     crossorigin="anonymous"
                     :src="`http://localhost:3000/files/article/${article.id}/${item.content}`"
                     alt=""
                  />
               </div>
               <p>{{ item.caption }}</p>
               <div
                  class="preview__item-nav"
                  @mouseenter="$emit('toggleShowOptions', index)"
                  @mouseleave="$emit('toggleShowOptions', index)"
               >
                  <CustomKebabMenuList :is-show="item.showOptions">
                     <CustomKebabMenuItem v-if="index != 0">
                        <div
                           class="flex gap-4"
                           @click="$emit('reorderingImage', index, 'go up')"
                        >
                           <CustomIcon :svg-icon="arrowSolidUp" />
                           <p>atas</p>
                        </div>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem
                        v-if="index != article.ArticleDetails.length - 1"
                     >
                        <div
                           class="flex gap-4"
                           @click="$emit('reorderingImage', index, 'go down')"
                        >
                           <CustomIcon :svg-icon="arrowSolidDown" />
                           <p>bawah</p>
                        </div>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem>
                        <div
                           class="flex gap-4"
                           @click="$emit('editImage', index)"
                        >
                           <CustomIcon :svg-icon="imageEdit" />
                           <p>ubah</p>
                        </div>
                     </CustomKebabMenuItem>
                     <CustomKebabMenuItem>
                        <div
                           class="flex gap-4"
                           @click="$emit('removeImage', index)"
                        >
                           <CustomIcon :svg-icon="trash" />
                           <p>hapus</p>
                        </div>
                     </CustomKebabMenuItem>
                  </CustomKebabMenuList>
               </div>
            </div>
         </li>
      </ul>
   </div>
</template>
