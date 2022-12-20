<script setup>
import { imageAdd, textAdd } from '../../utils/svg-var'
import CustomIcon from '../CustomIcon.vue'
</script>
<template>
  <div class="modal article-add" @click.stop>
    <div class="card">
      <div class="card__head">
        <div class="card__title">
          <h3>pilih salah satu</h3>
        </div>
      </div>
      <div class="card__body">
        <ul class="article-add__list">
          <li class="article-add__item">
            <div class="article-add__icon">
              <CustomIcon :svg-icon="textAdd" width="48"></CustomIcon>
              <p>teks</p>
            </div>
          </li>
          <li class="flex items-center">
            <p class="text-lg font-medium text-gray-500">Atau</p>
          </li>
          <li class="article-add__item">
            <div class="article-add__icon">
              <CustomIcon :svg-icon="imageAdd" width="48"></CustomIcon>
              <p>gambar</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
