<script lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref, defineComponent } from 'vue';

interface partProject {
    partNames: string
    projectNames: string
}

export default defineComponent({
  data() {
    return {
        partsandProject: [] as partProject[],
        selectedPart: '',
        selectedProject:'',
    };
  },
  created() {
    fetch('http://localhost:5235/api/set-project-components',{
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((data: partProject[]) => {
        this.partsandProject = data;
      });
  },
  methods: {
    async addComponentToProject() {
      const response = await fetch('http://localhost:5235/api/set-project-components', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prName: projectName.value,
          paName: partName.value
        })
      })
    
      if (response.status === 200) {
        createToast('Sikeres alkatrész hozzáadás a projekthez!', {
          position: 'bottom-right',
          transition: 'slide'
        })
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        })
      }
    }
  }
});

const projectName = ref<string>()
const partName = ref<string>()
</script>

<template>
    <div class="wrapper">
      <div class="adderBox">
        <label for="parts">Alkatrészek</label><br>
        <select v-model="selectedPart" id="parts" required>
            <option v-for="(pp,index) in partsandProject" :value="pp.partNames" :key="index">{{ pp.partNames }}</option>
        </select><br>
        <label for="projects">Projektek</label><br>
        <select v-model="selectedProject" id="projects" required>
            <option v-for="(pp,index) in partsandProject" :value="pp.projectNames" :key="index">{{ pp.projectNames }}</option>
        </select>
        <br /><br />
        <input autocomplete="off" type="submit" @click="addComponentToProject" value="Hozzáad" />
      </div>
    </div>
  </template>
<style>
* {
    box-sizing: border-box;
  }
  .wrapper {
  height: 90vh;
  background-color: #83b8ff;
}
.adderBox {
  padding-left: 35%;
  padding-right: 35%;
  padding-top: 19%;
  color: black;
}

input[type='submit'] {
  padding: 10px;
  width: 100%;
  background-color: #2fffad;
  color: black;
  height: 50px;
  font-size: 20px;
  border: none;
  border-radius: 25px;
  letter-spacing: 2px;
}

input[type='text'],
input[type='number'] {
  padding: 25px;
  height: 40px;
  font-size: 18px;
  width: 100%;
}
.item {
  width: 100%;
  text-align: center;
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

label{
  font-size: 20px;
}
  </style>
  