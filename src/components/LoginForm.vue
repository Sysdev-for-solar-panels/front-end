<template>
    <div class="loginBox">
      <h1>Belépés</h1>
      <form @submit.prevent="test">
        <div class="textField">
          <input v-model="email" type="text" required>
          <label>Email cím</label>
        </div>
        <div class="textField">
          <input v-model="password" type="password" required>
          <label>Jelszó</label>
        </div>
        <input type="submit" value="Belépés" >
        <br><br>
      </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref<string>()
const password = ref<string>()

const test = async () => {
    const response = await (await fetch('http://localhost:5235/api/login', {
        method: "POST",
        credentials:"include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })).json()
}
</script>

<style scoped>
.loginBox{
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    background: white;
    border-radius: 10px;
}
.loginBox form{ 
    padding: 0 40px;
    box-sizing: border-box;
}
.loginBox h1{
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid black;
    color: black;
}
form .textField{
    position: relative;
    border-bottom: 2px solid black;
    margin: 30px 0;
}
.textField input{
    width: 100%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
}
.textField label{
    position: absolute;
    top: 50%;
    left: 5px;
    color: black;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: .5s;
}
.textField span::before{
    width: 0%;
    height: 2px;
    top: 40px;
    left: 0;
    background: black;
    transition: .2s;
    position: absolute;
}
.textField input:focus ~ label,
.textField input:valid ~ label{
    top: -6px;
    color: black;
}
.textField input:focus ~ span::before,
.textField input:valid ~ span::before{
    width: 100%;
}
.pass{
    margin: -5px 0 20px 5px;
    color: #a6a6a6;
    cursor: pointer;
}
input[type="submit"]{
    width: 100%;
    height: 50px;
    font-size: 20px;
    color: #e9f4fb;
    border: 5px solid;
    border-radius: 25px;
    background: #800080;
}
</style>