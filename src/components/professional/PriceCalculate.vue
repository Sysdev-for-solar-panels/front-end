<script lang="ts">

import { defineComponent, ref } from 'vue';

interface PriceCal {
    name: string;
    description: string;
    status: string;
    sumPrice: number
}


export default defineComponent({
  data() {
    return {
      prices: ref<PriceCal[]>()
    };
  },
  created() {
    fetch('http://localhost:5235/api/price-calculate', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((data: PriceCal[]) => {
        this.prices = data;
        console.log(data);
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
          <th>Leírás</th>
          <th>Státusz</th>
          <th>Projekt ár kalkuláció</th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="(Project) in prices" :key="Project.name">
          <td>{{ Project.name }}</td>
          <td>{{ Project.description }}</td>
          <td>{{ Project.status }}</td>
          <td>{{ Project.sumPrice +' Ft'}}</td>
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
