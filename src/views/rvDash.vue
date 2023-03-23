<script setup lang="ts">
import {logout} from '@/router/logout'
</script>

<template>
    <div class="wrapper">
        <div class="item1">
            <button @click="logout">Kijelentkezés</button>
        </div>
        <div class="item2" id="b1">
        <h1>Új hozzáadása</h1>
        <table>
            <tr>
                <th>Név</th>
                <th>Ár</th>
                <th>Darab</th>
            </tr>
            <tr>
                <td><input type="text" id="rvNameAdd"></td>
                <td><input type="number" minlength="1" id="rvPriceAdd"></td>
                <td><input type="number" minlength="1" id="rvQuantityAdd"></td>
                <td><button type="submit" id="rvButtonAdd" onsubmit="">Hozzáadás</button></td>
            </tr>
        </table> 
    </div>
    <div class="item4" id="b2">
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
</div>
</template>

<style scoped>
#b1{
    font-size: 18px;
}
#b2{
    font-size: 18px;
}
table{
    border: none;
    color: black;
    background-color: white;
    padding: 5px 5px;
}
input[type="text"], input[type="number"]{
    width: 200px;
    height: 35px;
}
button{
    color: white;
    border: none;
    background-color: purple;
    padding: 10px 10px;
}
</style>
