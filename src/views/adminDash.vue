<template>
    <button @click="logout">kilép</button>
</template>

<script setup lang="ts">
import router from '@/router';
import { useLoginCheckerStore } from '@/stores/loginChecker';

const loginChecker = useLoginCheckerStore()

const logout = () => {
    loginChecker.logout()
    loginChecker.setRole()
    router.push('/')
}
</script>

<style scoped>

</style>