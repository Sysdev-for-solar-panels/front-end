<template>
    <div class="menu">
      <SideMenu @change-interface="change" />
    </div>
    <div class="interace">
      <ProjectExecution v-show="projectExecution" />
      <ProjectPartLocation v-show="projectPartLocation" />

    </div>
  </template>
  
  <script setup lang="ts">
  import ProjectExecution from '@/components/warehouseman/ProjectExecution.vue'
  import ProjectPartLocation from '@/components/warehouseman/ProjectPartLocation.vue'
  //import PartRoutePlan from '@/components/warehouseman/PartRoutePlan.vue'
  import SideMenu from '@/components/SideMenu.vue'
  import { ref } from 'vue'
  
  const projectExecution = ref(true)
  const projectPartLocation = ref(false)
  //const partRoutePlan = ref(false)

  
  const change = (id: string) => {
    projectExecution.value = false
    projectPartLocation.value = false
    //partRoutePlan.value = false

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
  