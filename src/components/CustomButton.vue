<script setup>
import { computed } from 'vue'
import CustomIcon from './CustomIcon.vue'

const props = defineProps({
   title: {
      type: String,
      default: 'button',
   },
   size: {
      type: String,
      default: 'md',
      validator(value) {
         return ['xs', 'sm', 'md', 'lg'].includes(value)
      },
   },
   variant: {
      type: String,
      default: 'solid',
      validator(value) {
         return ['solid', 'outline', 'link'].includes(value)
      },
   },
   block: {
      type: Boolean,
   },
   color: {
      type: String,
      default: 'secondary',
   },
   startIcon: {
      type: Object,
      default: {
         value: '',
         width: '24',
      },
   },
   endIcon: {
      type: Object,
      default: {
         value: '',
         width: '24',
      },
   },
})

const emit = defineEmits(['buttonAction'])

const getSize = computed(() => {
   return `btn btn--${props.size}`
})
const getVariantAndColor = computed(() => {
   if (props.variant === 'solid') {
      return `btn--${props.color}`
   } else if (props.variant === 'outline') {
      return `btn__outline--${props.color}`
   } else if (props.variant === 'link') {
      return `btn__link--${props.color}`
   }
})
const getIconSize = computed(() => {
   return '24'
})

function buttonClick() {
   emit('buttonAction')
}
</script>
<template>
   <button
      type="button"
      @click="buttonClick"
      :class="[getSize, getVariantAndColor, { btn__block: block }]"
   >
      <span v-if="startIcon.value" class="btn__start-icon">
         <CustomIcon :svgIcon="startIcon.value" :width="startIcon.width" />
      </span>
      {{ title }}
      <span v-if="endIcon.value" class="btn__end-icon">
         <CustomIcon :svgIcon="endIcon.value" :width="endIcon.width" />
      </span>
   </button>
</template>

<style lang="scss" scoped>
/* .btn { */
/*   span:first-child { */
/*     @apply mr-2; */
/*   } */

/*   span:last-child { */
/*     @apply ml-2; */
/*   } */
/* } */
</style>
