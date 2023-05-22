<script setup lang="ts">

import { createToast } from 'mosha-vue-toastify';
import { onBeforeMount, ref } from 'vue';

interface Project {
    name: string;
    description: string;
    status: string;
    user_id: number;
    Location: string;
    ID:number;
}
const projects = ref<Project[]>()

const changeStatus = async (id:number) => {
  const response = await fetch('http://localhost:5235/api/change-project-status', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:id
    })
  })

  if (response.ok) {
    createToast('Sikeres projekt státusz változtatás', {
      position: 'bottom-right',
      transition: 'slide'
    })

    getProjects()

  } else {
    createToast('Sikertelen művelet', {
      position: 'bottom-right',
      transition: 'slide'
    })
  }

}

const getProjects = async () => {
  const result = await fetch('http://localhost:5235/api/list-project', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json'
      },
    })
    projects.value = await result.json()
}

onBeforeMount(() => {
  getProjects()
})
</script>

<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>Projekt neve</th>
          <th>Helyszín</th>
          <th>Leírás</th>
          <th>Megrendelő</th>
          <th>Státusz</th>
          <th>@@@@@</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.name">
          <td>{{ project.name }}</td>
          <td>{{ project.Location }}</td>
          <td>{{ project.description }}</td>
          <td>{{ project.user_id }}</td>
          <td>{{ project.status }}</td>
          <td><button @click="changeStatus(project.ID)">Kiválaszt</button></td>
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
  padding: 5px;
}

tbody td {
  border: 1px solid #DDD;
  padding: 5px;
  background-color: hsl(205, 44%, 22%);
  color:white;
  text-align: center;
}
button{
  min-width:100px;
  background-color: antiquewhite;
  background-color: #0f6bae;
  border: none;
  color: white;
  padding: 10px;
}
</style>