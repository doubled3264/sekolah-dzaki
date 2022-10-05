<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import CustomIcon from '../../components/CustomIcon.vue'
import { calendar, trash } from '../../utils/svg-var'
import CustomButton from '../../components/CustomButton.vue'
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
   <div class="pembayaran__catatan-detail">
      <div class="custom-card">
         <div class="custom-card__header">
            <div class="custom-card__title">
               <h4>detail catatan</h4>
            </div>
            <div
               class="custom-card__right-nav pembayaran__catatan-detail__right-nav"
            >
               <p>{{ getCatatanCreatedAt }}</p>
            </div>
         </div>
         <div class="custom-card__body">
            <div class="pembayaran__catatan__item-info">
               <div class="pembayaran__catatan__item-date w-full">
                  <p class="whitespace-normal">{{ catatan.isi_catatan }}</p>
               </div>
            </div>
         </div>
         <div class="custom-card__footer">
            <div class="pembayaran__catatan-detail__footer">
               <CustomButton
                  title="tutup"
                  color="verdigris"
                  block
                  size="sm"
                  @button-action="$emit('closeDetail')"
               />
               <div
                  class="pembayaran__catatan__item-delete"
                  @click="$emit('deleteNote', catatan.id)"
               >
                  <CustomIcon :svg-icon="trash" />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
