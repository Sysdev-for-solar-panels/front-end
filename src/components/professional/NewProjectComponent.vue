<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref } from 'vue'

const projectName = ref<string>()
const location = ref<string>()
const description = ref<string>()
const orderData = ref<string>()
const projectStatus = ref<string>()
  
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
      status: projectStatus.value,
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

      <input disabled type="text" id="projectStatus" name="projectStatus" value="New">
      <br /><br />

      <input autocomplete="off" type="submit" @click="AddNewProject" value="Hozzáad" />
    </div>
  </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
  }
  .wrapper {
  height: 90py;
  background-color: #83b8ff;
}
.adderBox {
  padding-left: 35%;
  padding-right: 35%;
  padding-top: 10%;
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

input[type='text']{
  padding: 25px;
  height: 40px;
  font-size: 18px;
  width: 100%;
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
</style>
