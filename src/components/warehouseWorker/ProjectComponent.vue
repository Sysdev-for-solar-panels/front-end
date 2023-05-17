<script setup lang="ts">
import { onBeforeMount,ref, watch } from 'vue'

interface Projects {
  id:number
  name:String
  description:String
  status:String
  user_id:number,
}

const projects = ref<Projects[]>()
const selectedPart = ref<String>()
const projectComponents = ref()

const getProjects = async () => {
  const response = await fetch('http://localhost:5235/api/list-project', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const result = await response.json()
  projects.value = result
}

onBeforeMount(() => {
  getProjects()
})

watch(selectedPart,async () => {
  const found:any = projects.value?.find(element => element.name === selectedPart.value);
  const response = await fetch('http://localhost:5235/api/component-location', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:found.ID
    })
  })
  const result = await response.json()
  projectComponents.value = result
})

</script>

<template>
    <div class="wrapper">
         <select v-model="selectedPart" id="parts" required>
            <option v-for="item in projects" :value="item.name" :key="item.name">{{ item.name }}</option>
        </select><br>
        <table>
      <thead>
        <tr>
          <th>Lépés</th>
          <th>Név</th>
          <th>X</th>
          <th>Y</th>
          <th>Z</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(component,index) in projectComponents" :key="index">
          <td>{{ index }}</td>
          <td>{{ component.ComponentName }}</td>
          <td>{{ component.X }}</td>
          <td>{{ component.Y }}</td>
          <td>{{ component.Z }}</td>
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
}
</style>