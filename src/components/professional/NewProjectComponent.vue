<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref } from 'vue'

const projectName = ref<string>()
const location = ref<string>()
const description = ref<string>()
const orderData = ref<string>()

const addComponent = async () => {
  const response = await fetch('http://localhost:5235/api/add-newProject', {
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
    <div class="adderBox">
      <input
        v-model="projectName"
        autocomplete="off"
        type="text"
        id="projectName"
        placeholder="Projekt név"
      /><br /><br />

      <input
        v-model="location"
        autocomplete="off"
        type="text"
        id="location"
        placeholder="Helyszín"
      /><br /><br />

      <input
        v-model="description"
        autocomplete="off"
        type="text"
        id="description"
        placeholder="Leírás"
      /><br /><br />

      <input
        v-model="orderData"
        autocomplete="off"
        type="text"
        id="quanorderDatatity"
        placeholder="Megrendelő adatok"
      /><br /><br />
      <input autocomplete="off" type="submit" @click="addComponent" value="Hozzáad" />
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  height: 90vh;
  background-color: rgb(255, 255, 255, 0.8);
}
.adderBox {
  padding-left: 35%;
  padding-right: 35%;
  padding-top: 19%;
  color: black;
}

input[type='submit'] {
  padding: 10px;
  width: 400px;
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
</style>
