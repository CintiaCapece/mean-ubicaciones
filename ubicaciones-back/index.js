const express = require('express');
const conectarDB = require('./config/db');

//Creamos el servidor
const app = express();

conectarDB(); // Conectamos a la BD

app.use(express.json());

app.use('/api/ubicaciones', require('./routes/ubicacion'));

app.listen(4000, () => {
    console.log('El servidor se levanto correctamente')
})
