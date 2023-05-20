<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';

interface MissingComponent {
    ComponentID: number;
    ComponentName: string;
    MissingPart: number;
}

const missingParts = ref<MissingComponent[]>()

const getMissingParts = async () => {
    const response = await fetch('http://localhost:5235/api/missing-component', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    missingParts.value = await response.json()
}

onBeforeMount(() => {
    getMissingParts()
})

</script>

<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Komponens név</th>
          <th>Hiányzó darab</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="part in missingParts" :key="part.ComponentName">
          <td>{{ part.ComponentID }}</td>
          <td>{{ part.ComponentName }}</td>
          <td>{{ part.MissingPart }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.wrapper {
  height: 90vh;
  background-color: #83b8ff;
}
.table-container {
  width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

thead th {
  color:white;
  background-color: #0f6bae;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

tbody td {
  border: 1px solid #DDD;
  padding: 10px;
  background-color: hsl(205, 44%, 22%);
  color:white;
  text-align: center;
}
</style>
