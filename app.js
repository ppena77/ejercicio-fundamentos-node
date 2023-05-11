// * IMPORTAMOS MÓDULOS

const axios = require('axios');

// * VARIABLES Y FUNCIONES

// Temperatura

let temp;

const getRandomTemp = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
};

temp = getRandomTemp(-5, 24);

console.log(temp);

// Fecha

let date = new Date();
let UTCDate = date.toUTCString();

// Testing pusshing data to Json

let data = {
    sensor : 'st101',
    temperatura: temp,
    fecha: UTCDate
};

console.log(data);

// * ENVÍO DATOS A SERVIDOR

axios.post('http://127.0.0.1:8099/temp/reg', data);