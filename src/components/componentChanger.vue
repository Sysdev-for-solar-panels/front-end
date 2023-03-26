<template>
    <div class="wrapper">
        <div class="changerBox">
            
            <input type="text" id="id" placeholder="ID"><br><br>
            <input type="number" id="price" placeholder="Új ár"><br><br>
            <input type="submit" @click="" value="Módosít">
        </div>
        
    </div>
</template>

<style scoped>
.wrapper {
    height: 90vh; 
    background-color: rgb(255, 255,255, 0.8);
}
.changerBox{
    padding-left: 35%;
    padding-right: 35%;
    padding-top: 19%;
    color: black;
}

input[type="submit"]{
    padding: 10px;
    width: 400px;
    background-color: #2FFFAD;
    color:black;
    height: 50px;
    font-size: 20px;
    border: none;
    border-radius: 25px;
    letter-spacing: 2px;
}

input[type="text"], input[type="number"]{
    padding: 25px;
    height: 40px;
    font-size: 18px;
    width: 400px;
}
</style>