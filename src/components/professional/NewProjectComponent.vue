<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref } from 'vue'

const projectName = ref<string>()
const location = ref<string>()
const description = ref<string>()
const orderData = ref<string>()

const AddNewProject = async () => {
  const response = await fetch('http://localhost:5235/api/add-new-project', {
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
      <input autocomplete="off" type="submit" @click="AddNewProject" value="Hozzáad" />
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.wrapper {
  height: 90vh;
  background-color: #83b8ff;
}
.container {
  display: grid;
  padding: 16px;
  background-color: #83b8ff;
  height: 90vh;
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
  display: block;
  margin-right: auto;
  margin-left: auto;
}

input[type='text'] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #e1e1e1;
  font-size: 1.5rem;
}

input[type='text']:focus {
  background-color: #e1e1e1;
  outline: none;
}
</style>
