<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'

const emit = defineEmits([
  'show-pop-up',
  'refresh-price'
])

const changePrice = (id:number) => {
  emit('show-pop-up',id)
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

const prop = defineProps<{
  dataChanged?: boolean
}>()

watch(() => prop.dataChanged, async () => {
  if (prop.dataChanged === true) {
    components.value =  await (await listComponents()).json()
    emit('refresh-price')
  }
})

</script>

<template>
  <div class="wrapper">
    <div class="line header">
      <div>Id</div>
      <div>Name</div>
      <div>Price</div>
    </div>
    <div class="line" v-for="component in components" :key="component['Price']">
      <div>
        {{ component["ID"] }}
      </div>
      <div>
        {{ component["Name"] }}
      </div>
      <div>
        {{ component["Price"] }}
      </div>
      <div class="reColor">
        <div @click="changePrice(component['ID'])" class="button">
            Új ár <font-awesome-icon :icon="['fa', 'money-bill']" />
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
  user-select: none;
}

.button:hover {
  cursor: pointer;
}
</style>
