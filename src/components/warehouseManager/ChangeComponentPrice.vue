<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref } from 'vue'

const id = ref<string>()
const value = ref<string>()

const changePice = async () => {
  const response = await fetch('http://localhost:5235/api/set-price', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id.value,
      value: value.value
    })
  })

  if (response.status === 200) {
    createToast('Sikeres ár változtatás!', {
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
    <div class="changerBox">
      <input
        v-model="id"
        autocomplete="off"
        type="text"
        id="id"
        placeholder="ID"
        required
      /><br /><br />
      <input
        v-model="value"
        autocomplete="off"
        type="number"
        id="price"
        placeholder="Új ár"
        required
      /><br /><br />
      <input autocomplete="off" type="submit" @click="changePice" value="Módosít" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 90vh;
  background-color: rgb(255, 255, 255, 0.8);
}
.changerBox {
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
</style>
