<script setup>
defineProps({
   item: {
      type: Array,
      default: ['item'],
   },
})

function checkedInput(event) {
   console.log(event.target.checked)
}
</script>
<template>
   <div class="custom-switch" v-if="item.length == 1">
      <p>cicilan</p>
      <label class="custom-switch__wrapper">
         <input type="checkbox" @click="checkedInput" />
         <span class="custom-switch__slider"></span>
      </label>
   </div>
</template>

<style lang="scss"></style>
