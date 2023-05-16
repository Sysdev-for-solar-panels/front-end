<script lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { defineComponent,ref } from 'vue';

interface Project {
    name: string;
    description: string;
    status: string;
    user_id: number;
    Location: string;
}

const workingTime = ref<number>()
const workingPrice = ref<number>()

export default defineComponent({
  data() {
    return {
      project: ref<Project[]>(),
        selectedProject:'',
        workingPrice:null,
        workingTime:null
    };
  },
  created() {
    this.listProjects();
  },
  methods: {
    async listProjects() {
      const response = await fetch('http://localhost:5235/api/list-project', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        this.project = data;
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        });
      }
    },
    async AddTimeAndPrice() {
      const response = await fetch('http://localhost:5235/api/add-time-and-price', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pName : this.selectedProject,
          workingPrice: workingPrice.value,
          workingTime: workingTime.value
        })
      });
    
      if (response.status === 200) {
        createToast('Sikeres idő és összeg hozzárendelés a projekthez!', {
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

</script>

<template>
    <div class="wrapper">
      <div class="container">
          <h1>Idő és Munkadíj</h1>
          <select v-model="selectedProject" id="project" required>
            <option v-for="(Project) in project" :key="Project.name">{{ Project.name }}</option>
        </select>
          <br /><br />
          <input v-model="workingTime" autocomplete="off" type="number" id="workingTime"  placeholder="Munkavégzési idő"/><br /><br />
          <input v-model="workingPrice" autocomplete="off" type="number" id="workingPrice" placeholder="Munkadíj"/><br /><br />

        <input autocomplete="off" type="submit" @click="AddTimeAndPrice" value="Hozzáad" />
      </div>
    </div>
  </template>
<style scoped>
.wrapper {
  background-color: #83b8ff;
}
.container {
  padding-left: 35%;
  padding-top: 15%;
  display:block;
  justify-content:center;
  align-items:center;
}

input[type='submit'] {
height: 50px;
width: 400px;
border: none;
}

input[type='text'] {
border: none;
}

select{
  width: 50%;
  
}
h1{
  letter-spacing: 3px;
  color: black;
}

</style>
  