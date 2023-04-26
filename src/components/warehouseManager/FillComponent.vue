<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify';
import { onBeforeMount, ref } from 'vue';

const stackItems = ref()
const components = ref()
const selected = ref<string>()
const newQuantityValue = ref<number>()

onBeforeMount(async () => {
  const stackItemReq = await fetch('http://localhost:5235/api/list-stack', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  stackItems.value =  await stackItemReq.json()

  const componentsReq = await fetch('http://localhost:5235/api/list-components', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  components.value =  await componentsReq.json()
})

const fillUp = async (name:string, quantity:number, maxQuantity:number, type:string, compId:number) => {
    if (selected.value && newQuantityValue.value) {
      if ((quantity + newQuantityValue.value) <= maxQuantity && type == selected.value) {
        const response = await fetch('http://localhost:5235/api/update-component', {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: compId,
            quantity: (newQuantityValue.value + quantity)
          })
        })

        if (response.status === 200) {
          createToast('Sikeres frissítés', {
            position: 'bottom-right',
            transition: 'slide'
          }) 
        } else if (response.status === 500) {
          createToast('Sikertelen művelet', {
            position: 'bottom-right',
            transition: 'slide'
        }) 
      }
    }
  }
}
</script>

<template>
    <div class="wrapper">
      <select v-model="selected">
        <option v-for="component in components" :value="component['Name']" :key="component['Name']">
          {{ component["Name"] }}
        </option>
      </select>
      <input type="number" v-model="newQuantityValue"/>
      <div class="line header">
        <div>Id</div>
        <div>Típus</div>
        <div>Mennyiség</div>
        <div>Max Mennyiség</div>
      </div>
      <div class="line" v-for="item in stackItems" :key="item.StackId">
        <div>
          {{  item.StackId }}
        </div>
        <div>
          {{  item.ComponentName }}
        </div>
        <div>
          {{ item.ComponentQuantity }}
        </div>
        <div>
          {{ item.ComponentMaxQuantity }}
        </div>
        <div @click="fillUp(item.ComponentName,item.ComponentQuantity, item.ComponentMaxQuantity, item.ComponentName, item.ComponentId)" class="button">
          Feltölt <font-awesome-icon :icon="['fa', 'circle-plus']" />
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
  grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
  text-align: center;
  margin-bottom: 10px;
}

.header {
  border: 5px;
  border-style: groove;
}

.button {
  background-color: green;
  user-select: none;
}

.button:hover {
  cursor: pointer;
}
</style>