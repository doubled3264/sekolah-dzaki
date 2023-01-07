<script setup>
import { onMounted, ref } from 'vue'
import {
   arrowSolidDown,
   arrowSolidUp,
   trash,
   pencil,
} from '../../utils/svg-vars'
import CustomIcon from '../../components/CustomIcon.vue'
import CustomThreeDotOptionsList from '../../components/CustomThreeDotOpions/OptionsList.vue'
import CustomThreeDotOptionsItem from '../../components/CustomThreeDotOpions/OptionsItem.vue'

defineEmits(['editText', 'reorderingImage', 'removeImage', 'toggleShowOptions'])
defineProps({
   items: {
      type: Array,
      default: [],
   },
})
const availHeight = ref(0)

onMounted(() => {
   availHeight.value = window.innerHeight - (32 + 24 + 20 + 36 + 142 + 12)
   console.log(availHeight.value)
})
</script>
<template>
   <ul
      :style="{ maxHeight: availHeight + 'px' }"
      class="article-add__preview-list"
   >
      <li
         v-for="(item, index) in items"
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
                     <div class="flex gap-4" @click="$emit('editText', index)">
                        <CustomIcon :svg-icon="pencil" />
                        <p>ubah</p>
                     </div>
                  </CustomThreeDotOptionsItem>
                  <CustomThreeDotOptionsItem>
                     <div class="flex gap-4">
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
               class="image-content__delete"
               @click="$emit('removeImage', index)"
            >
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
                        v-if="index != items.length - 1"
                     >
                        <div
                           class="flex gap-4"
                           @click="$emit('reorderingImage', index, 'go down')"
                        >
                           <CustomIcon :svg-icon="arrowSolidDown" />
                           <p>bawah</p>
                        </div>
                     </CustomThreeDotOptionsItem>
                  </CustomThreeDotOptionsList>
               </div>
            </div>
         </div>
      </li>
   </ul>
</template>
