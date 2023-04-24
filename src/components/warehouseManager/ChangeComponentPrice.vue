<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { onBeforeMount, ref } from 'vue'

const changePrice = () => {

}

const listComponents = async () => {
  const response = await fetch('http://localhost:5235/api/list-components', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}
const components = ref()

onBeforeMount(async () =>{
  components.value =  await (await listComponents()).json()
})

</script>

<template>
  <div class="wrapper">
    <div class="line header">
      <div>Id</div>
      <div>Name</div>
      <div>Price</div>
    </div>
    <div class="line" v-for="component in components" :key="component.name">
      <div>
        {{ component["ID"] }}
      </div>
      <div>
        {{ component["Name"] }}
      </div>
      <div>
        {{ component["Price"] }}
      </div>
      <div @click="changePrice" class="button">
          Új ár <font-awesome-icon :icon="['fa', 'money-bill']" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 90vh;
  background-color: rgb(255, 255, 255, 0.8);
  color: black;
}

.line {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  text-align: center;
  margin-bottom: 10px;
}

.header {
  border: 5px;
  border-style: groove;
}

.button {
  background-color: green;
}

.button:hover {
  cursor: pointer;
}
</style>
