<template>
  <div class="menu">
    <SideMenu @change-interface="change" />
  </div>
  <div class="interace">
    <NewProjectComponent v-show="newProjectComponent" />
    <ProjectList v-show="projectList" />
    <PartList v-show="partList" />
    <AddCompToProject v-show="addCtoP" />
    <AddWorkingTimeAndPrice v-show="addWTandP" />
    <PriceCalculate v-show="priceCalcu" />
    <ProjectClose v-show="closeProject" />

  </div>
</template>

<script setup lang="ts">
import NewProjectComponent from '@/components/professional/NewProjectComponent.vue'
import ProjectList from '@/components/professional/ProjectList.vue'
import PartList from '@/components/professional/PartList.vue'
import AddCompToProject from '@/components/professional/AddCompToProject.vue'
import AddWorkingTimeAndPrice from '@/components/professional/AddWorkingTimeAndPrice.vue'
import PriceCalculate from '@/components/professional/PriceCalculate.vue'
import ProjectClose from '@/components/professional/ProjectClose.vue'
import SideMenu from '@/components/SideMenu.vue'
import { ref } from 'vue'

const newProjectComponent = ref(true)
const projectList = ref(false)
const partList = ref(false)
const addCtoP = ref(false)
const addWTandP = ref(false)
const priceCalcu = ref(false)
const closeProject = ref(false)

const change = (id: string) => {
  newProjectComponent.value = false
  projectList.value = false
  partList.value = false
  addCtoP.value = false
  addWTandP.value = false
  priceCalcu.value = false
  closeProject.value = false
  //execute id as a ts script
  eval(id).value = true
}
</script>

<style scoped>
.menu {
  grid-area: 'menu';
}

.interface {
  grid-area: 'interface';
}
</style>
