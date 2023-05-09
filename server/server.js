// * MODULOS REQUERIDOS

const express = require('express');
const bodyParser = require('body-parser');

// * INICIAR EXPRESS
const app = express();

// * EXPRESS MIDDLEWARE
app.use(bodyParser.json()); //Para poder capturar json en el body del request

// * EXPRESS ROUTES

app.get('', (req, res) => {
    res.send('We are listening')
});

app.post('/temp', (req, res) => {
    let data = req.body;
    res.send('Recieving post correctly');
    console.log(data);
});

// * EXPREESS LISTENING IN

const port = 8099;

app.listen(port, () => {
    console.log(`Server is live and listening in port ${port}`);
});