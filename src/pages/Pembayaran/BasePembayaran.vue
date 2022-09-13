<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Sidebar from '../../components/layouts/sidebar/Sidebar.vue'
import CustomHeader from '../../components/layouts/header/CustomHeader.vue'
import CustomButton from '../../components/CustomButton.vue'

const store = useStore()
const overlayIsActive = ref(false)

function activeModal() {
   overlayIsActive.value = !overlayIsActive.value
}
onMounted(() => {
   overlayIsActive.value = true
   store.commit('sidebar/setActivePage', 'pembayaran')
})
</script>
<template>
   <div class="content">
      <div class="wrapper">
         <CustomHeader />
         <div class="table-data">
            <div class="table-data__title">
               <h4>data pembayaran</h4>
               <CustomButton
                  title="tambah data"
                  color="primary"
                  @button-action="activeModal"
               />
            </div>
         </div>
      </div>
   </div>
   <Sidebar />
</template>
