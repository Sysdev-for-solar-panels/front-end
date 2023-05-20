<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify';
import {ref} from 'vue'

const emit = defineEmits([
    'change-price'
])

const prop = defineProps<{
  selectedId?: number
}>()
const value = ref<number>()

const changePrice = async () =>{
    const response = await fetch('http://localhost:5235/api/set-price', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:prop.selectedId,
            value:value.value
        })
    })

    if (response.status === 400) {
        createToast('Nem sikerült árat modósítani', {
        position: 'bottom-right',
        transition: 'slide'
        })
    } else if (response.status === 200) {
        createToast('Sikeres ármodósítás', {
        position: 'bottom-right',
        transition: 'slide'
        })
    }
    emit('change-price')
}

</script>

<template>
 <!--  <div class="popUp">
        <p>Új ár:</p>
        <div class="popUpInternals">
            <input v-model="value" type="number"/>
        </div>
        <button @click="changePrice">Megváltoztat</button>
    </div>--> 
    <div class="box">
        <br>
        <label>Új ár:</label>
        <div class="input"><input v-model="value" type="number"/></div>
        <div class="changeBtn"><button @click="changePrice">Megváltoztat</button></div>
    </div>
</template>

<style scoped>
.box{
    background-color: gray;
    text-align: center;
    color: white;
    width: 300px;
    height: 200px;
}
input{
    width: 200px;
    height: 40px;
    margin-top: 10%;
    margin-bottom: 10%;
}

button{
    color: black;
    background-color: white;
    border: none;
    padding: 10px;
    font-weight: bold;
}

</style>