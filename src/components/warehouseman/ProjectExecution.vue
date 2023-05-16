<script lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { defineComponent,ref } from 'vue';

interface Project {
    id: number,
    name: string;
    description: string;
    status: string;
    Location: string;
    time: number;
    price: number;
}

export default defineComponent({
  data() {
    return {
        project: ref<Project[]>(),
        id:''
    };
  },
  created() {
    this.listProjects();
  },
  methods: {
    async listProjects() {
      const response = await fetch('http://localhost:5235/api/list-project', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        this.project = data;
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        });
      }
    },
    async ProjectStatus() {
      const response = await fetch('http://localhost:5235/api/project-execution', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: this.id
        })
      })
    
      if (response.status === 200) {
        createToast('Sikeres alkatrész hozzáadás a projekthez!', {
          position: 'bottom-right',
          transition: 'slide'
        })
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        })
      }
    }
  }
});

</script>

<template>
    <div class="wrapper">
      <table>
      <thead>
        <tr>
          <th>Név</th>
          <th>Leírás</th>
          <th>Státusz</th>
          <th>Lokáció</th>
          <th>Idő</th>
          <th>Ár</th>
          <th>Státusz módosítás</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in project" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.description }}</td>
          <td>{{ p.status }}</td>
          <td>{{ p.Location }}</td>
          <td>{{ p.time }}</td>
          <td>{{ p.price }}</td>
          <td><input autocomplete="off" type="submit"  @click="ProjectStatus" value="Kiválaszt"/></td>
        </tr>
      </tbody>
    </table>
    </div>
  </template>
<style>
* {
    box-sizing: border-box;
  }
  .wrapper {
  height: 90vh;
  background-color: #83b8ff;
}
.adderBox {
  padding-left: 35%;
  padding-right: 35%;
  padding-top: 19%;
  color: black;
}

input[type='submit'] {
  padding: 10px;
  width: 100%;
  background-color: #2fffad;
  color: black;
  height: 50px;
  font-size: 20px;
  border: none;
  border-radius: 25px;
  letter-spacing: 2px;
}

input[type='text'],
input[type='number'] {
  padding: 25px;
  height: 40px;
  font-size: 18px;
  width: 400px;
}
.item {
  width: 100%;
  text-align: center;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 1.5rem;
  display: inline-block;
  background-color: #e1e1e1;
  border: none;
}

option {
  color: black;
  background-color: white;
}
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
label{
  font-size: 20px;
}
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
  