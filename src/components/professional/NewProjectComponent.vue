<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref } from 'vue'

const projectName = ref<string>()
const location = ref<string>()
const description = ref<string>()
const orderData = ref<string>()

const AddNewProject = async () => {
  const response = await fetch('http://localhost:5235/api/create-project', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: projectName.value,
      location: location.value,
      description: description.value,
      status: "New",
      orderData: orderData.value
    })
  })

  if (response.status === 200) {
    createToast('Sikeres projekt létrehozás!', {
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
</script>

<template>
  <div class="wrapper">
    
    <div class="container">
      <h1>Új projekt hozzáadása</h1><br>
      <input v-model="projectName" autocomplete="off" type="text" id="projectName" placeholder="Projekt neve"/><br><br>
      <input v-model="location" autocomplete="off" type="text" id="location" placeholder="Projekt helyszín"/><br><br>
      <input v-model="description" autocomplete="off" type="text" id="description" placeholder="Projekt leírása"/><br><br>
      <input v-model="orderData" autocomplete="off" type="text" id="quanorderDatatity" placeholder="Projekt megrendelő ID"/><br><br>
      <input autocomplete="off" type="submit" @click="AddNewProject" value="Projekt hozzáadása" /><br>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #83b8ff;
}
.container {
  padding-left: 35%;
  padding-top: 10%;
  display:block;
  justify-content:center;
  align-items:center;
}

input[type='submit'] {
height: 50px;
width: 400px;
border: none;
}

input[type='text'] {
border: none;
}
h1{
  letter-spacing: 3px;
  color: black;
}

</style>