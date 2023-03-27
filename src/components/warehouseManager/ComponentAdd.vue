<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify';
import { ref } from 'vue';

const name = ref<string>()
const price = ref<string>()
const quantity = ref<string>()

const addComponent = async () => {
    const response = await fetch('http://localhost:5235/api/add-component', {
        method: "POST",
        credentials:"include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            price: price.value,
            maxQuantity:quantity.value
        })
    })

    if (response.status === 200) {
        createToast("Sikeres alkatrész felvétel!",{
            position: "bottom-right",
            transition: "slide",
        })
    } else if (response.status === 404) {
        createToast("Hiányzó adat!",{
            position: "bottom-right",
            transition: "slide",
        })
    }

    console.log(await response.json())
}
</script>

<template>
    <div class="wrapper">
        <div class="adderBox">
            
            <input v-model="name"  autocomplete="off" type="text" id="name" placeholder="Név"><br><br>
            
            <input v-model="price"  autocomplete="off" type="number" id="price" placeholder="Ár"><br><br>
            
            <input v-model="quantity"  autocomplete="off" type="number" id="quantity" placeholder="Darab"><br><br>
            <input autocomplete="off" type="submit" @click="addComponent" value="Hozzáad">
        </div>
        
    </div>
</template>
<style scoped>
.wrapper {
    height: 90vh; 
    background-color: rgb(255, 255,255, 0.8);
}
.adderBox{
    padding-left: 35%;
    padding-right: 35%;
    padding-top: 19%;
    color: black;
}


input[type="submit"]{
    padding: 10px;
    width: 400px;
    background-color: #2FFFAD;
    color:black;
    height: 50px;
    font-size: 20px;
    border: none;
    border-radius: 25px;
    letter-spacing: 2px;
}

input[type="text"], input[type="number"]{
    padding: 25px;
    height: 40px;
    font-size: 18px;
    width: 400px;

}
.item {
    width: 100%;
    text-align: center;
}
</style>