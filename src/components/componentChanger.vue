<template>
    <div class="wrapper">
    <table class="tablazat">
        <tr>
            <th>ID</th>
            <th>Új ár</th>
        </tr>
        <tr>
            <td><input class="item" type="number" minlength="1" id="rvIdUpdate"></td>
            <td><input class="item" type="number" minlength="1" id="rvPriceUpdate"></td>
            <td><button type="submit" id="rvButtonUpdate" onsubmit="">Módosít</button></td>
        </tr>
    </table>
</div>
</template>

<style scoped>

.tablazat{
    padding-top: 15%;
    padding-bottom: 15%;
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
    height: auto;
    font-size: 18px;
    font-style: oblique;
}

button {
    padding: 10px;
    width: 100px;
    background-color: purple;
    color:white;
    height: 40px;
    font-size: 18px;
}

input[type="text"], input[type="number"]{
    padding: 10px;
    height: 40px;
    font-size: 18px;

}

.wrapper {
    height: 90vh; /*90vh volt az original*/
    background-color: rgb(255, 255,255, 0.8);
    color: black;
    font-size: 16px;
}


.item {
    width: 100%;
    text-align: center;
}
</style>