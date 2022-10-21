<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import CustomIcon from '../../components/CustomIcon.vue'
import { arrowRight } from '../../utils/svg-var'
import NewCustomInput from '../../components/NewCustomInput.vue'

const props = defineProps({
  parentItem: String,
  childItem: String,
})
const store = useStore()
onMounted(() => {
  store.commit('sidebar/setAllToNormal')
  store.commit('sidebar/setActiveParent', props.parentItem)
  store.commit('sidebar/setActiveChild', {
    parent: props.parentItem,
    itemToActive: props.childItem,
  })
})
</script>
<template>
  <div class="content">
    <div class="content__inner">
      <div class="content__head">
        <div class="content__path">
          <span>iuran</span>
          <CustomIcon :svg-icon="arrowRight" width="10" />
          <span>tambah data iuran baru</span>
        </div>
        <div class="content__title">
          <h3>tambah data iuran baru</h3>
        </div>
      </div>
      <div class="content__body">
        <div class="iuran-add__content">
          <div class="iuran-add__data card">
            <div class="card__head">
              <div class="card__title">formulir data iuran</div>
            </div>
            <div class="card__body">
              <form>
                <NewCustomInput label="nama" placeholder="Masukan nama iuran.." />
                <NewCustomInput label="jarak / interval iuran" placeholder="Masukan nominal iuran.." />
                <NewCustomInput label="rincian interval" placeholder="Masukan rincian iuran.." />
              </form>
            </div>
          </div>
          <div class="iuran-add__rincian card">
            <div class="card__head">
              <div class="card__title">formulir rincian iuran</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
