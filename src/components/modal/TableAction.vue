<script setup>
import { trash, pencil, info } from '../../utils/svg-vars'
import CustomIcon from '../CustomIcon.vue'

defineEmits(['infoAction', 'editAction', 'deleteAction'])
</script>

<template>
   <div class="modal table-action" @click.stop>
      <div class="card">
         <div class="card__head">
            <div class="card__title">pilih salah satu</div>
         </div>
         <div class="card__body table-action">
            <ul class="table-action__list">
               <li class="table-action__item" @click="$emit('infoAction')">
                  <div class="table-action__icon">
                     <CustomIcon :svg-icon="info" width="32"></CustomIcon>
                     <p>rincian</p>
                  </div>
               </li>
               <li class="table-action__item" @click="$emit('editAction')">
                  <div class="table-action__icon">
                     <CustomIcon :svg-icon="pencil" width="32"></CustomIcon>
                     <p>ubah data</p>
                  </div>
               </li>

               <li class="table-action__item" @click="$emit('deleteAction')">
                  <div class="table-action__icon">
                     <CustomIcon :svg-icon="trash" width="32"></CustomIcon>
                     <p>hapus data</p>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
