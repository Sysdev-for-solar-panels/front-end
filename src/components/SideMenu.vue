<script setup lang="ts">
import {logout} from '@/router/logout'

const emit = defineEmits([
    "change-interface"
])

const changeInterface = (event:Event) => {
 const switchToInterface = (event.currentTarget as Element).id
 emit('change-interface',switchToInterface)
}
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <button id="componentAdder" @click="changeInterface">
                <div class="button-container">
                    <font-awesome-icon class="icon" :icon="['fas', 'plus']" />
                    <div class="text">
                        Alkatrész
                    </div>
                </div>
            </button>
            <button id="componentChanger" @click="changeInterface">
                <div class="button-container">
                    <font-awesome-icon class="icon" :icon="['fas', 'dollar-sign']" />
                    <div class="text">
                        Ár
                    </div>
                </div>
            </button>
            <button @click="logout">
                <div class="button-container">
                    <font-awesome-icon class="icon" icon="fa-solid fa-right-from-bracket" />
                    <div class="text">
                        Kijelentkezés
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: grid;
    background-color: rgba(158, 32, 175,0.45);
    height: 90vh;
    border-radius: 30px;
}

button{
    color: white;
    border: none;
    background-color: purple;
    height: 3rem;
    border-radius: 10px;
}

button:hover {
    color: purple;
    background-color: white;
}
.container {
    display: inherit;
    place-self: center;
    gap: 2em;
}


.icon {
    place-self: center start;
    font-size: large;
}

.text {
    place-self: start;
    font-size: 1.5rem;
    place-self: center start;
}

@media only screen and (max-width: 600px) {
    .text {
        display: none;
    }

    .button-container {
        display: grid;
        grid-template-columns: auto;
        place-content: center;
        gap: 20px;
    }
}

@media only screen and (min-width: 600px) {
    .button-container {
        display: grid;
        grid-template-columns: min-content auto;
        gap: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }   
}
</style>