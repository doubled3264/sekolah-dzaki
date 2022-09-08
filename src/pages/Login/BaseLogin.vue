<script setup>
import { ref } from 'vue'
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

const pageActive = ref('signin')

const changePage = (page) => {
  pageActive.value = page
}
</script>

<template>
  <div class="login">
    <div class="login__content">
      <SignIn v-if="pageActive === 'signin'" @event="changePage" />
      <SignUp v-if="pageActive === 'signup'" @event="changePage" />
    </div>
  </div>
</template>
