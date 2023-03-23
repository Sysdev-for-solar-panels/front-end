<script setup lang="ts">
import {logout} from '@/router/logout'
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <button class="item" @click="logout">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
            </button>
            <button class="item" @click="logout">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
            </button>
        </div>
    </div>
</template>

<style scoped>
button{
    color: white;
    border: none;
    background-color: purple;
    width: 100%;
    height: 3rem;
    border-color: black;
    border-style: solid;
    place-self: center;
}

.container {
    display: grid;
    gap: 2rem;
}

.wrapper {
    height: 90vh;
    background-color: white;
}
</style>