// * IMPORTAMOS MÓDULOS

const axios = require('axios');

// * VARIABLES Y FUNCIONES

// Función para generar temperatura (con rango abierto). Hemos usado como fuente de info. para hacer el cálculo la documentación de Mozilla

const getRandomTemp = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};



// Función para conseguir la fecha cuando se llama a la misma

const getDate = () => {
    const date = new Date();
    return date.toUTCString();
};

// Función que genera los datos deseados cada 15 minutos y los manda al servidor

const dataInterval = 900000; // Ponemos el intervalo en una varible, por si queremos cambiarlo (milisegundos)

const getAndSendData = () => {
    setInterval(() => {
        const temp = getRandomTemp(-5, 24); // Pasamos el rango de temperatura deseado
        const dataDate = getDate(); // Generamos la fecha
        const data = {
            sensor : 'st101',
            temperatura: temp,
            fecha: dataDate
        }; // Guardamos los datos en un objeto
        axios.post('http://127.0.0.1:8099/temp/reg', data) // Pasamos los datos al servidor. Axios se encarga de especificar el tipo de contenido (Json) sin necesidad de declararlo. A su vez, pasamos la URL absoluta, por una cuestión de preferencia. Como solo hay una ruta ahora mismo, no consideramos necesario declarar la ruta raiz en axios y después llamar a post con rutas relativas.
    }, dataInterval);
};

// Llamamos a la función general
getAndSendData();