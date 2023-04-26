<script lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref, defineComponent } from 'vue';

interface Project {
    projectNames: string
}
const closeProject = ref<string>()
export default defineComponent({
  data() {
    return {
        project: [] as Project[],
        selectedProject:'',
        closeProject: null as string | null
    };
  },
  created() {
    fetch('http://localhost:5235/api/close-project')
      .then(response => response.json())
      .then((data: Project[]) => {
        this.project = data;
      });
  },
  methods: {
    async CloseProject() {
      const response = await fetch('http://localhost:5235/api/close-project', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cProject: closeProject
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


</script>

<template>
    <div class="wrapper">
      <div class="adderBox">
          <label for="projects">Projektek</label>
          <select v-model="selectedProject" id="projects" required>
              <option v-for="(pp,index) in project" :value="pp.projectNames" :key="index">{{ pp.projectNames }}</option>
          </select>
          <br /><br />
          <label for="end">Lezárás</label>
            <select v-model="closeProject" id="end" required>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            </select>
            <br /><br />
            
        <input autocomplete="off" type="submit" @click="CloseProject" value="Hozzáad" />
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
  width: 400px;
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
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
label{
  font-size: 20px;
}
  </style>
  