<script setup>
import { onMounted, ref } from 'vue'
import CustomIcon from '../../components/CustomIcon.vue'
import {
  arrowSolidDown,
  arrowSolidUp,
  trash,
  pencil,
} from '../../utils/svg-vars'

defineEmits(['editText', 'reorderingImage', 'removeImage'])
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
  <ul :style="{ maxHeight: availHeight + 'px' }" class="article-add__preview-list">
    <li v-for="(item, index) in items" :key="index + 1" class="article-add__preview-item">
      <div v-if="item.type === 'text'" class="text-content">
        <div class="text__wrapper" v-html="item.value"></div>
        <div class="text-content__nav">
          <CustomIcon :svg-icon="pencil" @click="$emit('')" />
        </div>
      </div>
      <div v-if="item.type === 'image'" class="image-content">
        <div class="image__wrapper">
          <img :src="item.value.preview" :alt="item.value.raw.name" />
        </div>
        <p>{{ item.value.caption }}</p>
        <div class="image-content__delete" @click="$emit('removeImage', index)">
          <CustomIcon :svg-icon="trash" />
        </div>
        <div class="image-content__nav">
          <CustomIcon v-if="index != 0" :svg-icon="arrowSolidUp" @click="$emit('reorderingImage', index, 'go up')" />
          <CustomIcon v-if="index != items.length - 1" :svg-icon="arrowSolidDown"
            @click="$emit('reorderingImage', index, 'go down')" />
        </div>
      </div>
    </li>
  </ul>
</template>
