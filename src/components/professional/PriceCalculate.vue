<script lang="ts">


</script>

<template>
  <!-- <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>Projekt neve</th>
          <th>Leírás</th>
          <th>Státusz</th>
          <th>Ár kalkuláció</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(Project, index) in projects" :key="index">
          <td>{{ Project.projectName }}</td>
          <td>{{ Project.description }}</td>
          <td>{{ Project.status }}</td>
          <td>{{ Project.calculatedPrice +' Ft'}}</td>
        </tr>
      </tbody>
    </table>
  </div> -->
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
