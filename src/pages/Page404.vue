<script setup>
import { onMounted } from 'vue'

onMounted(() => {
   document.title = 'Halaman Tidak Tersedia.'
})
</script>
<template>
   <div class="404__wrapper w-1/3 mx-auto mt-32">
      <div class="card">
         <div class="card__body mt-0 py-24">
            <h3 class="text-center text-4xl font-bold text-gray-600">
               Halaman Tidak Tersedia
            </h3>
         </div>
      </div>
   </div>
</template>
