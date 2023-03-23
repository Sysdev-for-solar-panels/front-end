<template>
    <div class="wrapper">
        <table class="tablazat">
            <tr>
                <th>Név</th>
                <th>Ár</th>
                <th>Darab</th>
            </tr>
            <tr>
                <td><input class="item" id="bNameValue" type="text"></td>
                <td><input class="item" id="bPriceValue" type="number"></td>
                <td><input class="item" id="bQuantityValue" type="number"></td>
                <td><input type="submit" @click=""></td>
            </tr>
            <tr>
                <td>
                </td>
            </tr>
            <!-- a "response" -t kell átírni erre -> Sikeres / Sikertelen adatbevitel, exception handling is kell mellé-->
            <tr>
                <td id="response" colspan="3" style="text-align: center; vertical-align: middle;"></td>
            </tr>
        </table>
    </div>
</template>
<style scoped>
.wrapper {
    height: 90vh; /*90vh volt az original*/
    background-color: white;
    color: black;
    font-size: 16px;
}
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

input[type="submit"]{
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
.item {
    width: 100%;
    text-align: center;
}
</style>