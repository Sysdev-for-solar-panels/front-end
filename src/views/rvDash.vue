<template>
    <div id="content">
        <label>Név</label>
        <input type="text" id="rvNameAdd"><br>

        <label>Ár</label>
        <input type="number" id="rvPriceAdd"><br>

        <label>Darab</label>
        <input type="number" id="rvQuantityAdd"><br><br>

        <button type="submit" id="rvButtonAdd">Hozzáadás</button>
    </div>
</template>

<style scoped>
#content{
    border-color: grey;
    padding: 10px;
    color: black;
}
input[type=submit]{
    color: black;
    font-size: 12px;
    border: none;
    margin: 2px 4px;

}
</style>