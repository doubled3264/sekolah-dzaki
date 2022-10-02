<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import CustomIcon from '../../components/CustomIcon.vue'
import { calendar, trash } from '../../utils/svg-var'

const props = defineProps({
   catatan: {
      type: Object,
      default: {
         id: '',
         isi_catatan: '',
         createdAt: '',
      },
   },
})

const getCatatanCreatedAt = computed(() => {
   return format(new Date(props.catatan.createdAt), 'dd MMMM yyyy', {
      locale: id,
   })
})
</script>
<template>
   <div
      class="pembayaran__catatan__item"
      @click="$emit('getDetailNote', catatan.id)"
   >
      <div class="pembayaran__catatan__item-info">
         <div class="pembayaran__catatan__item-date">
            <CustomIcon :svg-icon="calendar" />
            <p>{{ getCatatanCreatedAt }}</p>
         </div>
      </div>
   </div>
</template>
