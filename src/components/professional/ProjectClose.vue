<script lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { defineComponent,ref } from 'vue';

interface ProjectStat {
    name: string;
    description: string;
    status: string;
    user_id: number;
    Location: string;
}

export default defineComponent({
  data() {
    return {
        projectStat: ref<ProjectStat[]>(),
        selectedProject:'',
        selectedStatus: ''
    };
  },
  created() {
    this.listProjects();
  },
  methods: {
    async listProjects() {
      const response = await fetch('http://localhost:5235/api/list-project',{
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        this.projectStat = data;
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        })
      }
    },
    async ProjectStatus() {
      const response = await fetch('http://localhost:5235/api/project-status', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ProjectName: this.selectedProject,
          status: this.selectedStatus
        })
      });
    
      if (response.status === 200) {
        createToast('Sikeres projekt státusz módosítás!', {
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
          <label for="projects">Projektek:</label>
          <select v-model="selectedProject" id="projects" required>
            <option v-for="(Project) in projectStat" :key="Project.name">{{ Project.name }}</option>
        </select>
          <br /><br />
          <label for="end">Státusz:</label>
            <select v-model="selectedStatus" id="end" required>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            </select>
            <br /><br />
        <input autocomplete="off" type="submit" @click="ProjectStatus" value="Hozzáad" />
    </div>
  </template>
<style scoped>
* {
    box-sizing: border-box;
  }
  .wrapper {
    padding-left: 30%;
    padding-right: 30%;
    padding-top: 15%;
    padding-bottom:10%;
    height: 90vh;
    background-color: #83b8ff;
    color: black;
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
  