<script setup>
import CustomModal from '../../components/CustomModal.vue'
import CustomIcon from '../../components/CustomIcon.vue'
import { user } from '../../utils/svg-var'
import { ref } from 'vue'

/** @type {string} section siswa | akademik  */
const section = ref('siswa')

/**
 * toggle detail section
 * @param {string} modalName siswa | akademik
 */
function toggleSection(sectionName) {
   console.log(sectionName)
   section.value = sectionName
}
</script>
<template>
   <CustomModal modal-name="siswa/detail">
      <template v-slot:title>
         <h4>infromasi siswa</h4>
      </template>
      <template v-slot:body>
         <div class="row items-center">
            <div class="modal-informasi__icon">
               <CustomIcon :svg-icon="user"></CustomIcon>
            </div>

            <div class="modal-informasi__nama">
               <p>zaskia nur alifa</p>
               <p>202209129</p>
            </div>
         </div>
         <div class="modal-informasi__detail-chooser">
            <div
               :class="[{ active: section == 'siswa' }]"
               @click="toggleSection('siswa')"
            >
               <p>siswa</p>
            </div>
            <div
               :class="[{ active: section == 'akademik' }]"
               @click="toggleSection('akademik')"
            >
               <p>akademik</p>
            </div>
         </div>
         <div class="modal__siswa-detail__list" v-show="section == 'siswa'">
            <div class="modal-informasi__item">
               <div class="absolute -top-3.5 left-2 px-2 bg-white">
                  <p class="font-semibold capitalize text-verdigris">
                     data siswa
                  </p>
               </div>
               <div class="row">
                  <div class="modal-informasi__siswa-item">
                     <p>NISN :</p>
                     <p>006477266</p>
                  </div>
                  <div class="modal-informasi__siswa-item">
                     <p>NIK :</p>
                     <p>3174102232100004</p>
                  </div>
               </div>
               <div class="row mt-4">
                  <div class="modal-informasi__siswa-item">
                     <p>Jenis Kelamin :</p>
                     <p>Perempuan</p>
                  </div>
                  <div class="modal-informasi__siswa-item">
                     <p>Tempat Lahir :</p>
                     <p>Jakarta</p>
                  </div>
                  <div class="modal-informasi__siswa-item">
                     <p>Tanggal Lahir :</p>
                     <p>12 september 2010</p>
                  </div>
               </div>
            </div>
            <div class="modal-informasi__item">
               <div class="absolute -top-3.5 left-2 px-2 bg-white">
                  <p class="font-semibold capitalize text-verdigris">
                     data orang tua
                  </p>
               </div>
               <div class="row">
                  <div class="modal-informasi__siswa-item">
                     <p>Nama Ayah :</p>
                     <p>Maman Mantap</p>
                  </div>
                  <div class="modal-informasi__siswa-item">
                     <p>Nama Ibu :</p>
                     <p>Tini Sumarni</p>
                  </div>
               </div>
               <div class="row mt-4">
                  <div class="modal-informasi__siswa-item">
                     <p>No Telepon :</p>
                     <p>086754547612</p>
                  </div>
                  <div class="modal-informasi__siswa-item">
                     <p>Alamat :</p>
                     <p>JL Cilodong Raya</p>
                  </div>
               </div>
            </div>
         </div>
         <div class="modal__siswa-detail__list" v-show="section == 'akademik'">
            <div class="modal-informasi__item">
               <div class="absolute -top-3.5 left-2 px-2 bg-white">
                  <p class="font-semibold capitalize text-verdigris">
                     Akademik
                  </p>
               </div>
               <div class="row"></div>
            </div>
         </div>
      </template>
   </CustomModal>
</template>
