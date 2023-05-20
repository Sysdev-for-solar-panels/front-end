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
      <br>
      <input v-model="projectName" autocomplete="off" type="text" id="projectName" placeholder="Név"/>
      <input v-model="location" autocomplete="off" type="text" id="location" placeholder="Helyszín"/>
      <input v-model="description" autocomplete="off" type="text" id="description" placeholder="Leírás"/>
      <input v-model="orderData" autocomplete="off" type="text" id="quanorderDatatity" placeholder="Megrendelő (id)"/>
      <input autocomplete="off" type="submit" @click="AddNewProject" value="Hozzáadás" />
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  height: 90vh; /*90vh volt az original*/
  background-color: #83b8ff;
  color: black;
  font-size: 1.5rem;
}

/* Add padding to containers */
.container {
  display: grid;
  padding: 10px;
  background-color: #83b8ff;
  height: 90vh;
}

/* Full-width input fields */
input[type='text'] {
  text-align: center;
  width: 50%;
  padding: 15px;
  margin: 0 auto;
  display: inline-block;
  border: none;
  background: #e1e1e1;
  font-size: 1.5rem;
}

input[type='text']:focus {
  background-color: #e1e1e1;
  outline: none;
}
input[type='submit'] {
  padding: 10px;
  width: 400px;
  background-color: #2fffad;
  color: black;
  height: 50px;
  font-size: 20px;
  border: none;
  margin: 0 auto;
  border-radius: 25px;
  letter-spacing: 2px;
}

</style>