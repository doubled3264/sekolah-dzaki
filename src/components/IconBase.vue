<script setup>
import {  ref  } from 'vue'
import gsap from 'gsap'

const icon = ref(null)
defineProps({
  svgIcon: {
    type: [String],
    required: true,
  },
  width: {
    type: [Number, String],
    default: 24,
  },
  height: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: [String],
    default: 'currentColor',
  },
  strokeWidth: {
    type: [String],
    default: "10",
  },
  isActive: {
    type: [Boolean],
    default: false,
  },
})

const rotateIcon = (state) => {
  let rotation = 0
  if (state) {
    rotation = 90
  }
  gsap.to(icon.value, 1, {
    rotation: rotation,
    transformOrigin: 'center',
    ease: 'expo.out',
  })
}

/* watch( */
/*   () => props.isActive, */
/*   (newVal) => { */
/*     rotateIcon(newVal) */
/*   } */
/* ) */
</script>
<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <g ref="icon">
      <path
        :d="svgIcon"
        :fill="color"
        :stroke="color"
        :stroke-width="strokeWidth"
      />
    </g>
  </svg>
</template>
