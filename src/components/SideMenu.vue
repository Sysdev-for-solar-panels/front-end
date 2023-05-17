<script setup lang="ts">
import { logout } from '@/router/logout'
import { useLoginCheckerStore } from '@/stores/loginChecker'
import { onBeforeMount, ref } from 'vue'

const emit = defineEmits(['change-interface'])
const role = ref<string>()

onBeforeMount(() => {
  const store = useLoginCheckerStore()
  role.value = store.role
})

const changeInterface = (event: Event) => {
  const switchToInterface = (event.currentTarget as Element).id
  emit('change-interface', switchToInterface)
}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <button v-show="role === 'raktarvezeto'" id="componentAdd" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon class="icon" :icon="['fas', 'plus']" />
          <div class="text">Alkatrész</div>
        </div>
      </button>
      <button v-show="role === 'raktarvezeto'" id="missingComponent" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'question']" class="icon"/>
          <div class="text">Hiányzó</div>
        </div>
      </button>
      <button v-show="role === 'raktarvezeto'" id="reservedMissingComponent" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'question']" class="icon"/>
          <div class="text">Foglalt hiányzó</div>
        </div>
      </button>
      <button v-show="role === 'raktarvezeto'" id="changeComponentPrice" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon class="icon" :icon="['fas', 'dollar-sign']" />
          <div class="text">Ár</div>
        </div>
      </button>
      <button v-show="role === 'raktarvezeto'" id="fillComponent" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon class="icon" :icon="['fas', 'screwdriver-wrench']" />
          <div class="text">Feltöltés</div>
        </div>
      </button>
      <button v-show="role === 'szakember'" id="newProjectComponent" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'plus']" class="icon" />
          <div class="text">Új projekt</div>
        </div>
      </button>
      <button v-show="role === 'szakember' || role == 'raktaros'" id="projectList" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'list']" class="icon"/>
          <div class="text">Projekt lista</div>
        </div>
      </button>
      <button v-show="role === 'szakember'" id="partList" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'screwdriver']" class="icon" />
          <div class="text">Alkatrész lista</div>
        </div>
      </button>
      <button v-show="role === 'szakember'" id="addCtoP" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'screwdriver-wrench']" class="icon"/>
          <div class="text">Alkatrész hozzáadás</div>
        </div>
      </button>
      <button v-show="role === 'szakember'" id="addWTandP" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'pen']" class="icon"/>
          <div class="text">Idő, Ár rögzítés</div>
        </div>
      </button>
      <button v-show="role === 'szakember'" id="priceCalcu" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'calculator']" class="icon"/>
          <div class="text">Ár kalkuláció</div>
        </div>
      </button>
      <button v-show="role === 'szakember'" id="closeProject" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'calendar-xmark']" class="icon"/>
          <div class="text">Projekt vége</div>
        </div>
      </button>
      <button v-show="role === 'raktaros'" id="projectComponent" @click="changeInterface">
        <div class="button-container">
          <font-awesome-icon :icon="['fas', 'location-dot']" class="icon"/>
          <div class="text">Projekt alkatrészek</div>
        </div>
      </button>
      <button @click="logout">
        <div class="button-container">
          <font-awesome-icon class="icon" icon="fa-solid fa-right-from-bracket" />
          <div class="text">Kijelentkezés</div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  background-color: #83b8ff;
  height: 90vh;
  border-radius: 0px;
}

button {
  color: white;
  border: none;
  background-color: #0f6bae;
  height: 3rem;
  border-radius: 10px;
  padding: auto
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

@media only screen and (min-width: 600px ) {
  .button-container {
    display: grid;
    grid-template-columns:min-content auto;
    gap: 5px;
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
