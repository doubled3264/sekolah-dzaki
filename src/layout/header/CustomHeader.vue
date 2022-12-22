<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import CustomButton from '../../CustomButton.vue'

const route = useRoute()
const store = useStore()
const title = ref('')

store.subscribe((mutation) => {
   switch (mutation.type) {
      case 'sidebar/setActivePage':
         if (mutation.payload) {
            title.value = mutation.payload
         }
         break
   }
})
</script>

<template>
   <div class="header">
      <div class="header__wrapper">
         <h4>{{ title }}</h4>

         <slot name="right-nav"></slot>
      </div>
   </div>
</template>
