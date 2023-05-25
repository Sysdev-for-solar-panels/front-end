<script setup lang="ts">

import { createToast } from 'mosha-vue-toastify';
import { onBeforeMount, ref } from 'vue';

//TODO: ár kiírása mindenhova

// interface PriceCal {
//     name: string;
//     description: string;
//     status: string;
//     sumPrice: number
// }

interface Project {
    ID:number;
    name: string;
    description: string;
    status: string;
    user_id: number;
    Location: string;
    price: number;
}

// const prices = ref<PriceCal[]>()
const projects = ref<Project[]>()
// const calcPrice = async () => {
//   const result = fetch('http://localhost:5235/api/price-calculate', {
//       method: 'GET',
//       credentials: 'include',
//       mode: 'cors',
//       headers: {
//       'Content-Type': 'application/json'
//       },
//     })
//     prices.value = await (await result).json()
// }
const priceCalculation = async (obj:Project) => {
  if (['Scheduled','InProgress'].includes(obj.status)) {
    const response = await fetch('http://localhost:5235/api/price-calculate', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: obj.name,
      description: obj.description,
      status: obj.status,
      sumPrice: obj.price,
      id: obj.ID,
      state: obj.status
    })
  })
  const result = await response.json()
  const price = result[0].sumPrice
  obj.price = price
  } else {
    obj.price = 0
  }
}

const changeStatus = async (status:String,id:number) => {
  const response = await fetch('http://localhost:5235/api/set-project-status', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      status: status
    })
  })

  if(response.ok) {
    const foundElement:Project = projects.value?.find(element => element.ID === id)!
    foundElement.status = status.toString()

    if (status === "Scheduled") {
      createToast('Sikeres árkalkuláció', {
        position: 'bottom-right',
        transition: 'slide'
      })

      priceCalculation(foundElement)
    }

  } else {
    createToast("Sikertelen állapotváltozás", {
      position: "bottom-right",
      transition: 'slide'
    })
  }
}

const listProject = async () => {
  const response = await fetch('http://localhost:5235/api/list-project', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json'
      },
    })
  const result:Project[] = await response.json()
  for(let item of result) {
    await priceCalculation(item)
  }
  projects.value = result
}

onBeforeMount(() => {
  listProject()
})
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
          <th>Ár kalkuláció</th>
        </tr>
      </thead>
      <template v-for="Project in projects" :key="Project.status">
        <tbody>
          <tr v-if="['Draft','Wait','Scheduled','InProgress'].includes(Project.status)">
            <td>{{ Project.name }}</td>
            <td>{{ Project.description }}</td>
            <td>{{ Project.status }}</td>
            <td>{{ Project.price }}</td>
            <td>
              <button v-if="['Draft'].includes(Project.status)" @click="changeStatus('Wait',Project.ID)">
                  Wait
              </button>
              <button v-if="['Draft','Wait'].includes(Project.status)" @click = "changeStatus('Scheduled',Project.ID)">
                Scheduled 
              </button>
            </td>
          </tr>
        </tbody>
      </template>
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
