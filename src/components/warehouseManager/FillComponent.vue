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

  console.log(stackItems.value)

  const componentsReq = await fetch('http://localhost:5235/api/list-components', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  components.value =  await componentsReq.json()
  console.log(components.value)
})

const join = async (stackId:number,component:string | undefined) => {
  if (component) {
    const response = await fetch('http://localhost:5235/api/join-stack', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        StackId: stackId,
        componentname: component
      })
    })

    if (response.status === 200) {
          createToast('Sikeres új komponens felvétel', {
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
        <div class="reColor">
        <div v-if="item.ComponentId" @click="fillUp(item.ComponentName,item.ComponentQuantity, item.ComponentMaxQuantity, item.ComponentName, item.ComponentId)" class="add-button">
          Feltölt <font-awesome-icon :icon="['fa', 'circle-plus']" />
        </div>
        <div v-else @click="join(item.StackId,selected)" class="join-button">
          Hozzárendel <font-awesome-icon :icon="['fas', 'layer-group']" />
        </div>
      </div>
      </div>
    </div>
</template>

<style scoped>
.reColor{
  color: white;
  padding: 4%;
}
.wrapper {
  height: 90vh;
  background-color: rgb(255, 255, 255, 0.5);
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

.add-button {
  background-color: green;
  user-select: none;
}

.add-buttonton:hover {
  cursor: pointer;
}

.join-button {
  background-color: yellow;
  user-select: none;
}

.join-button:hover {
  cursor: pointer;
}
</style>