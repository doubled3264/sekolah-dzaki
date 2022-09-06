<script setup>
import IconBase from '../../components/IconBase.vue'
import InputBase from '../../components/InputBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import { signin } from '../../utils/svg-var'

const emits = defineEmits(['event'])
</script>

<template>
  <div class="row">
    <form>
      <div class="row">
        <div class="input-field w-full mb-3">
          <InputBase type="text" />
        </div>
      </div>
      <div class="row">
        <div class="input-field w-full mb-3">
          <InputBase type="passoword" />
        </div>
      </div>
    </form>
  </div>
</template>
