// * MODULOS REQUERIDOS

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


// * INICIAR EXPRESS
const app = express();


// * EXPRESS MIDDLEWARE
app.use(bodyParser.json()); //Para poder capturar json en el body del request que se manda al servidor


// * DECLARACIÓN DE VARIABLES Y FUNCIONES

// Para manipular los datos JSON, tanto los que recibe el servidor, como los que se almacenan en el archivo local lecturas, creamos un array vacío
let temporalJson = [];


// Para cargar datos del archivo lecturas en nuestro objeto JSON temporal
const loadJsonFileData = () => {
    return new Promise( (resolve, reject) => {
        const fileRawData = fs.readFileSync('lecturas.json');
        const fileData = JSON.parse(fileRawData);
        temporalJson = fileData;
        console.log('Temporal JSON with File Info only: ', temporalJson);
        resolve();
    })
};

// Para añadir datos JSON mandados al servidor en nuestro objeto JSON temporal
const addSentData = (data) => {
    return new Promise( (resolve, reject) => {
        temporalJson.push(data);
        console.log('Temporal JSON with appended info: ', temporalJson);
        resolve();
    })
};

// const appendDataToFile = new Promise((resolve, reject) => {
//     fs.appendFileSync('lecturas.json', temporalJson);
//     resolve();    
// });


// * EXPRESS ROUTES

app.post('/temp', (req, res) => {
    let data = req.body; // Almacenamos los datos del body del request en un variable
    
    // Iniciamos cadena de procesos en el orden deseado
    loadJsonFileData()
        .then(addSentData(data))
        .then(res.send('Data recieved and registered'))
        .catch(error => console.log(error));    
});

// * EXPREESS LISTENING IN

const port = 8099;

app.listen(port, () => {
    console.log(`Server is live and listening in port ${port}`);
});