<script setup>
import { ref } from 'vue'
import { Multiselect } from 'vue-multiselect'

const props = defineProps({
   options: { type: Array, default: [] },
})

const selectedValue = ref('')
</script>

<template>
   <Multiselect :options="options" v-model="selectedValue" :selectLabel="''" />
</template>
