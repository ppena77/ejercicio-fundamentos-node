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
        try {
            const fileRawData = fs.readFileSync('lecturas.json');
            const fileData = JSON.parse(fileRawData);
            temporalJson = fileData;
            console.log('Json file data loaded in array');
            resolve();
        } catch (error) {
            reject(error);
        }        
    })
};

// Para añadir datos JSON mandados al servidor en nuestro objeto JSON temporal
const addSentData = (data) => {
    return new Promise( (resolve, reject) => {
        try {
            temporalJson.push(data);
            console.log('Recieved Json data added to array');
            resolve();
        } catch (error) {
            reject(error);
        }        
    })
};

// Para registrar los datos del objeto JSON temporal en el archivo lecturas
const registerJsonToFile = () => {
    return new Promise( (resolve, reject) => {
        try {
            const jsonText = JSON.stringify(temporalJson);
            fs.writeFileSync('lecturas.json', jsonText);
            console.log('Array saved to Json file');
            resolve();
        } catch (error) {
            reject(error);
        }        
    })
}


// * EXPRESS ROUTES

app.post('/temp/reg', (req, res) => {

    // Hacemos una pequeña validación para asegurarnos de que el servidor recibe un Json, antes de iniciar el proceso de registro. Si no recibe un Json, lo indica por consola y manda mensaje a la API.
    if (req.headers['content-type'] === 'application/json') {

        const data = req.body; // Almacenamos los datos del body del request en un variable

        // Iniciamos cadena de procesos en el orden deseado
        loadJsonFileData()
        .then(addSentData(data))
        .then(registerJsonToFile())
        .then(res.send('Data recieved and registered'))
        .catch( error => {
            console.log('There was an error at some point', error);
            res.send('There was an error at some point', error);
        });

    } else {
        console.log('Recieved request is not a Json object');
        res.send('Recieved request is no a Json object');
    }    
});


// * EXPREESS LISTENING IN

const port = 8099;

app.listen(port, () => {
    console.log(`Server is live and listening in port ${port}`);
});