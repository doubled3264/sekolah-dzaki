<script setup>
import CustomIcon from '../../components/CustomIcon.vue'
import { calendar, trash } from '../../utils/svg-var'

defineProps({
   catatan: {
      type: Object,
      default: {
         isi_catatan: '',
         createdAt: '',
      },
   },
})
</script>
<template>
   <div class="pembayaran__catatan__item">
      <p>{{ catatan.isi_catatan }}</p>
      <div class="pembayaran__catatan__item-info">
         <div class="pembayaran__catatan__item-date">
            <CustomIcon :svg-icon="calendar" />
            <p>{{ catatan.createdAt }}</p>
         </div>
         <div class="pembayaran__catatan__item-delete">
            <CustomIcon :svg-icon="trash" />
         </div>
      </div>
   </div>
</template>
