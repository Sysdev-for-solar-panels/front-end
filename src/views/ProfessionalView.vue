<template>
  <div class="menu">
    <SideMenu @change-interface="change" />
  </div>
  <div class="interace">
    <NewProjectComponent v-show="newProjectComponent" />
    <ProjectList v-show="projectList" />
    <PartList v-show="partList" />
  </div>
</template>

<script setup lang="ts">
import NewProjectComponent from '@/components/professional/NewProjectComponent.vue'
import ProjectList from '@/components/professional/ProjectList.vue'
import PartList from '@/components/professional/PartList.vue'
import SideMenu from '@/components/SideMenu.vue'
import { ref } from 'vue'

const newProjectComponent = ref(true)
const projectList = ref(false)
const partList = ref(false)

const change = (id: string) => {
  newProjectComponent.value = false
  projectList.value = false
  partList.value = false
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
