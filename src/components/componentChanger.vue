<template>
    <div class="wrapper">
    <h1>Ár módosítása</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Új ár</th>
        </tr>
        <tr>
            <td><input type="number" minlength="1" id="rvIdUpdate"></td>
            <td><input type="number" minlength="1" id="rvPriceUpdate"></td>
            <td><button type="submit" id="rvButtonUpdate" onsubmit="">Módosít</button></td>
        </tr>
    </table>
</div>
</template>

<style scoped>
.wrapper {
    height: 90vh; /*90vh volt az original*/
    background-color: rgb(255, 255,255, 0.8);
    color: black;
    font-size: 16px;
}
</style>