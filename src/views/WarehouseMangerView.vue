<template>
  <div class="menu">
    <SideMenu @change-interface="change" />
  </div>
  <div class="interace">
    <FillComponent v-show="fillComponent"/>
    <ComponentAdd v-show="componentAdd" />
    <ChangeComponentPrice :data-changed="dataChanged" @refresh-price="dataChanged = false" @show-pop-up="show" v-show="changeComponentPrice" />
    <ChangePricePopUp :selected-id="changedComponentId" @change-price="priceChanged" class="pop-up" v-show="shown"/>
    <MissingComponent v-show="missingComponent"/>
    <ReservedMissingComponent v-show="reservedMissingComponent"/>

  </div>
</template>

<script setup lang="ts">
import ChangeComponentPrice from '@/components/warehouseManager/ChangeComponentPrice.vue'
import ComponentAdd from '@/components/warehouseManager/ComponentAdd.vue'
import SideMenu from '@/components/SideMenu.vue'
import { ref } from 'vue'
import ChangePricePopUp from '@/components/warehouseManager/ChangePricePopUp.vue';
import FillComponent from '@/components/warehouseManager/FillComponent.vue';
import MissingComponent from '@/components/warehouseManager/MissingComponent.vue';
import ReservedMissingComponent from '@/components/warehouseManager/ReservedMissingComponent.vue';



const componentAdd = ref(true)
const changeComponentPrice = ref(false)
const fillComponent = ref(false)
const shown = ref(false)
const dataChanged = ref(false)
const missingComponent = ref(false)
const reservedMissingComponent = ref(false)
const changedComponentId = ref<number>()

const show = (id:number) => {
  shown.value = true
  changedComponentId.value = id
}

const change = (id: string) => {
  componentAdd.value = false
  changeComponentPrice.value = false
  fillComponent.value = false
  missingComponent.value = false
  reservedMissingComponent.value = false
  //execute id as a ts script
  eval(id).value = true
}

const priceChanged = () => {
  shown.value = false
  dataChanged.value = true
}
</script>

<style scoped>
.menu {
  grid-area: 'menu';
}

.interface {
  grid-area: 'interface';
  z-index: 0;
}

.pop-up {
  z-index: 2;
  position: absolute;
  left: 30%;
  top: 30%;
}
</style>
