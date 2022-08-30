<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
})
</script>
<template>
  <li class="sidebar__item">{{ title }}</li>
</template>
