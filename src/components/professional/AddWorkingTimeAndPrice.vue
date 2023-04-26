<script lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { ref, defineComponent } from 'vue';

interface Project {
    projectNames: string
}
const workingTime = ref<string>()
const workingPrice = ref<string>()
export default defineComponent({
  data() {
    return {
        project: [] as Project[],
        selectedProject:'',
        workingTime: null as string | null,
        workingPrice: null as string | null
    };
  },
  created() {
    fetch('http://localhost:5235/api/add-time-and-price')
      .then(response => response.json())
      .then((data: Project[]) => {
        this.project = data;
      });
  },
  methods: {
    async AddTimeAndPrice() {
      const response = await fetch('http://localhost:5235/api/add-time-and-price', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wPrice: workingPrice,
          wTime: workingTime
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
      <div class="container">
          <h1>Idő és Munkadíj</h1>
          <select v-model="selectedProject" id="projects" required>
              <option v-for="(pp,index) in project" :value="pp.projectNames" :key="index">{{ pp.projectNames }}</option>
          </select>
          <br /><br />
          <input v-model="workingTime" autocomplete="off" type="text" id="workingTime"  placeholder="Munkavégzési idő"/><br /><br />
          <input v-model="workingPrice" autocomplete="off" type="text" id="workingPrice" placeholder="Munkadíj"/><br /><br />

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
  