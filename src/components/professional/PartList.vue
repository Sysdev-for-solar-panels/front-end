<script lang="ts">

import { defineComponent } from 'vue';

interface Part {
    partName: string
    amount: Int16Array
    price : Int16Array
    available: string
}

export default defineComponent({
  data() {
    return {
        parts: [] as Part[],
    };
  },
  created() {
    fetch('http://localhost:5235/api/get-Part')
      .then(response => response.json())
      .then((data: Part[]) => {
        this.parts = data;
      });
  },
});
</script>

<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>Alkatrész neve</th>
          <th>Mennyiség</th>
          <th>Ár</th>
          <th>Elérhető</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in parts" :key="index">
          <td>{{ p.partName }}</td>
          <td>{{ p.amount }}</td>
          <td>{{ p.price }}</td>
          <td>{{ p.available }}</td>
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
  text-align: left;
  padding: 10px;
}

tbody td {
  border: 1px solid #DDD;
  padding: 10px;
  background-color: hsl(205, 44%, 22%);
  color:white;
}
</style>
