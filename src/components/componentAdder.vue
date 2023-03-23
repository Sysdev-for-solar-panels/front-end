<template>
    <div class="wrapper">
        <div class="container">
        <div class="item">Név</div>
        <div class="item">Ár</div>
        <div class="item">Darab</div>
        <input class="item" type="number">
        <input class="item" type="number">
        <input class="item" type="number">
    </div>
    </div>
</template>
<style scoped>
.container {
    display: grid;
    color: black;
    padding: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

.item {
    border: 1px solid black;
    width: 100%;
    text-align: center;
}

.wrapper {
    height: 90vh;
    background-color: white;
}
</style>