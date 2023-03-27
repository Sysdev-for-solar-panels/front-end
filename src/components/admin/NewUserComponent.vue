<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify';
import { ref } from 'vue';

    const name = ref<string>()
    const email = ref<string>()
    const password = ref<string>()
    const role = ref<string>()

    const sendRegistration = async () =>{
        const response = await fetch('http://localhost:5235/api/registration', {
        method: "POST",
        credentials:"include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                name:name.value,
                email:email.value,
                password:password.value,
                role:role.value
            })
        })

        if (response.status === 200) {
            createToast("Sikeres felhasználó regisztráció",{
                position: "bottom-right",
                transition: "slide",
            }) 
        } else if (response.status === 400) {
            createToast("Sikertelen felhasználó regisztráció",{
                position: "bottom-right",
                transition: "slide",
            }) 
        }
    }
</script>

<template>
    <div class="wrapper">
        <form @submit.prevent="sendRegistration" autocomplete="off">
            <div class="container">

                <label for="Name"><b>Név</b></label>
                <input v-model="name" type="text" placeholder="Adja meg a nevét" name="name" id="name" required>
                
                <label for="email"><b>Email</b></label>
                <input v-model="email" type="text" placeholder="Adja meg az email-t" name="email" id="email" required>

                <label for="psw"><b>Jelszó</b></label>
                <input v-model="password" type="password" placeholder="Adja meg a jelszót" name="psw" id="psw" required>

                <label for="roles">Jogosultság</label>

                <select v-model="role" id="roles" required>
                    <option value="admin">Admin</option>
                    <option value="raktaros">Raktáros</option>
                    <option value="raktarvezeto">Raktárvezető</option>
                    <option value="szakember">Szakember</option>
                </select>
                
                <hr>
                <button type="submit" class="registerbtn">Regisztráció</button>
        </div>
    </form>
</div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.wrapper {
    height: 90vh; /*90vh volt az original*/
    background-color: #83b8ff;
    color: black;
    font-size: 1.5rem;
}

/* Add padding to containers */
.container {
    display: grid;
    padding: 16px;
    background-color: #83b8ff;
    height: 90vh;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #e1e1e1;
  font-size: 1.5rem;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #e1e1e1;
  outline: none;
}

select {
    width: 100%;
    padding: 10px;
    font-size: 1.5rem;
    display: inline-block;
    background-color: #e1e1e1;
    border: none;
}

option {
    color: black;
    background-color: white;
}
/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}


/* Set a style for the submit button */
.registerbtn {
  background-color: #0f6bae;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  font-size: 1.5rem;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>