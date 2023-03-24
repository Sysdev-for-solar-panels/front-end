<template>
    <div class="menu">
        <SideMenu @change-interface="change"/>
    </div>
    <div class="interace">
        <ComponentAdder v-show="componentAdder"/>
        <ComponentChanger v-show="componentChanger"/>
    </div>
</template>

<script setup lang="ts">
    import ComponentAdder from '@/components/componentAdder.vue'
    import ComponentChanger from '@/components/componentChanger.vue'
    import SideMenu from '@/components/SideMenu.vue';
    import { ref } from 'vue';

    const componentAdder = ref(true)
    const componentChanger = ref(false)

    const change = (id:string) => {
        componentAdder.value = false
        componentChanger.value = false
        //execute id as a ts script
        eval(id).value = true
    }
</script>

<style scoped>
.menu {
    grid-area: "menu";
}

.interface {
    grid-area: "interface";
}
</style>