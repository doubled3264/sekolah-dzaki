<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

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
      </div>
   </div>
</template>
