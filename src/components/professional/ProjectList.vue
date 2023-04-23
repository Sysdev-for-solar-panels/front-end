<script lang="ts">

import { defineComponent } from 'vue';

interface Project {
    projectName: string;
    location: string;
    description: string;
    orderData: string;
    status: string;
}

export default defineComponent({
  data() {
    return {
        projects: [] as Project[],
    };
  },
  created() {
    fetch('http://localhost:5235/api/get-project')
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
        <tr v-for="(Project, index) in projects" :key="index">
          <td>{{ Project.projectName }}</td>
          <td>{{ Project.location }}</td>
          <td>{{ Project.description }}</td>
          <td>{{ Project.orderData }}</td>
          <td>{{ Project.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.wrapper {
  height: 90vh;
  background-color: rgb(255, 255, 255, 0.8);
}
.table-container {
  width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

thead th {
  background-color: #F5F5F5;
  font-weight: bold;
  text-align: left;
  padding: 10px;
}

tbody td {
  border: 1px solid #DDD;
  padding: 10px;
}
</style>
