<script lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { defineComponent , ref} from 'vue';
interface Draft{
  id: number;
}
interface Part{
    ID: number
    Name: string
    Quantity: number
    MaxQuantity: number
    Price: number
    Status: string
}

interface Project{
    ID: number
    name: string;
    description: string;
    status: string;
    user_id: number;
    Location: string;
}

export default defineComponent({
  data() {
    return {
      parts: ref<Part[]>(),
      projects: ref<Project[]>(),
      partID: 0,
      projectID:0
    };
  },
  created() {
    this.listProjects();
    this.listParts();
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
        this.projects = data;
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        });
      }
    },
    async listParts() {
      const response = await fetch('http://localhost:5235/api/list-components', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        this.parts = data;
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        });
      }
    },
    async addComponentToProject() {
      const response = await fetch('http://localhost:5235/api/set-project-components', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ProjectID: this.projectID,
          ComponentID: this.partID
        })
      });
    
      if (response.status === 200) {
        createToast('Sikeres alkatrész hozzá rendelés projekthez!', {
          position: 'bottom-right',
          transition: 'slide'
        })
      } else if (response.status === 404) {
        createToast('Hiányzó adat!', {
          position: 'bottom-right',
          transition: 'slide'
        })
      }
    },
    async SetProjectToDraft() {
      const response = await fetch('http://localhost:5235/api/set-project-to-draft', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.projectID,
        })
      });
    }
  }
});

</script>

<template>
    <div class="wrapper">
      <div class="content">
        <label for="parts">Alkatrészek</label><br><br>
        <select v-model="partID" id="parts" required>
            <option v-for="p in parts" :key="p.ID" :value="p.ID">{{ p.Name }}</option>
        </select><br><br>
        <label for="projects">Projektek</label><br><br>
        <select v-model="projectID" id="projects" required>
            <option v-for="(Project) in projects" :key="Project.ID" :value="Project.ID">{{ Project.name }}</option>
        </select>
        <br /><br /><br />
        <input autocomplete="off" type="submit" @click="addComponentToProject();SetProjectToDraft()" value="Hozzáad" />
      </div>
    </div>
  </template>
<style scoped>
* {
    box-sizing: border-box;
  }
  .wrapper {
  height: 90vh;
  background-color: #83b8ff;
}
.content {
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left: 30%;
  padding-right: 30%;
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
  