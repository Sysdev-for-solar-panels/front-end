<script setup lang="ts">
import NewUserComponent from '@/components/admin/NewUserComponent.vue';
import SideMenu from '@/components/SideMenu.vue';
import { ref } from 'vue';

const NewUser = ref(true)

const change = (id:string) => {
    NewUser.value = false
    //execute id as a ts script
    eval(id).value = true
}
</script>
<template>
    <div class="menu">
        <SideMenu @change-interface="change"/>
    </div>
    <div class="interface">
        <NewUserComponent/>
    </div>
</template>
<style scoped>
</style>