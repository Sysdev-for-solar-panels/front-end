<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify';
import {defineEmits, ref} from 'vue'

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
    <div>
        <p>Kérem adja meg a kivánt új árat</p>
        <div style="height: 40%;">
            <input v-model="value" type="number"/>
        </div>
        <button @click="changePrice">Változtat</button>
    </div>
</template>

<style scoped>
div {
    width: 400px;
    height: 200px;
    background-color: cadetblue;
    display: grid;
    text-align: center;
    color: black;
}
</style>