import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginCheckerStore = defineStore(
  'login',
  () => {
    const isLogedIn = ref(false)
    const role = ref<string>()

    function login() {
      isLogedIn.value = true
    }

    function logout() {
      isLogedIn.value = false
    }

    function setRole(value = undefined) {
      role.value = value
    }

    return { isLogedIn, logout, login, setRole, role }
  },
  {
    persist: true
  }
)
