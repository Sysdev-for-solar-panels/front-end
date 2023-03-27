<template>
    <div class="menu">
        <SideMenu @change-interface="change"/>
    </div>
    <div class="interace">
        <ComponentAdd v-show="componentAdd"/>
        <ChangeComponentPrice v-show="changeComponentPrice"/>
    </div>
</template>

<script setup lang="ts">
    import ChangeComponentPrice from '@/components/warehouseManager/ChangeComponentPrice.vue'
    import ComponentAdd from '@/components/warehouseManager/ComponentAdd.vue'
    import SideMenu from '@/components/SideMenu.vue';
    import { ref } from 'vue';

    const componentAdd = ref(true)
    const changeComponentPrice = ref(false)

    const change = (id:string) => {
        componentAdd.value = false
        changeComponentPrice.value = false
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