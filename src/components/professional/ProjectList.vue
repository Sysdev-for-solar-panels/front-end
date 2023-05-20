<script lang="ts">

import { defineComponent, ref } from 'vue';

interface Project {
    name: string;
    description: string;
    status: string;
    user_id: number;
    Location: string;

}

export default defineComponent({
  data() {
    return {
        projects: ref<Project[]>()
    };
  },
  created() {
    fetch('http://localhost:5235/api/list-project', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((data: Project[]) => {
        this.projects = data;
      });
  },
});
</script>

<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>Projekt neve</th>
          <th>Helyszín</th>
          <th>Leírás</th>
          <th>Megrendelő adatok</th>
          <th>Státusz</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(Project) in projects" :key="Project.name">
          <td>{{ Project.name }}</td>
          <td>{{ Project.Location }}</td>
          <td>{{ Project.description }}</td>
          <td>{{ Project.user_id }}</td>
          <td>{{ Project.status }}</td>
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
