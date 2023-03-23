<template>
    <div class="menu">
        <SideMenu/>
    </div>
    <div class="interace">
        <ComponentAdder/>
        <ComponentChanger v-show="false"/>
    </div>
</template>

<script setup lang="ts">
    import ComponentAdder from '@/components/componentAdder.vue'
    import ComponentChanger from '@/components/componentChanger.vue'
    import SideMenu from '@/components/SideMenu.vue';
</script>

<style scoped>
.menu {
    grid-area: "menu";
}

.interface {
    grid-area: "interface";
}
</style>