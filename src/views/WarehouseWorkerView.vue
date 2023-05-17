<template>
    <div class="menu">
        <SideMenu @change-interface="change" />
  </div>
  <div class="interace">
    <ProjectList v-show="projectList"/>
    <ProjectComponent v-show="projectComponent" />
  </div>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import ProjectComponent from '@/components/warehouseWorker/ProjectComponent.vue';
import ProjectList from '@/components/warehouseWorker/ProjectList.vue';

import { ref } from 'vue';

const projectList = ref(true)
const projectComponent = ref(false)

const change = (id: string) => {
  //execute id as a ts script
  projectList.value = false
  projectComponent.value = false
  eval(id).value = true
}
</script>