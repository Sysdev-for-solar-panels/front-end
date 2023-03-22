import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginCheckerStore = defineStore('login', () => {
  const isLogedIn = ref(false)

  function login() {
    isLogedIn.value = true
  }

  function logout() {
    isLogedIn.value = false
  }

  return { isLogedIn, logout, login }
})
