<script setup>
import CustomIcon from '../../components/CustomIcon.vue'
import { arrowSolidDown, arrowSolidUp, trash } from '../../utils/svg-vars'

defineEmits(['reorderingImage', 'removeImage'])
defineProps({
   items: {
      type: Array,
      default: [],
   },
})
</script>
<template>
   <ul class="artikel-add__preview-list">
      <li
         v-for="(item, index) in items"
         :key="index + 1"
         class="artikel-add__preview-item"
      >
         <div v-if="item.type === 'text'" v-html="item.value"></div>
         <div v-if="item.type === 'image'" class="image-content">
            <img :src="item.value.preview" :alt="item.value.raw.name" />
            <div
               class="image-content__delete"
               @click="$emit('removeImage', index)"
            >
               <CustomIcon :svg-icon="trash" />
               {{ index }}
            </div>
            <div class="image-content__nav">
               <CustomIcon
                  v-if="index != 0"
                  :svg-icon="arrowSolidUp"
                  @click="$emit('reorderingImage', index, 'go up')"
               />
               <CustomIcon
                  v-if="index != items.length - 1"
                  :svg-icon="arrowSolidDown"
                  @click="$emit('reorderingImage', index, 'go down')"
               />
            </div>
         </div>
      </li>
   </ul>
</template>
