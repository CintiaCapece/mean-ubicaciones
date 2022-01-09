const express = require('express');

//Creamos el servidor
const app = express();

app.listen(4000, () => {
    console.log('El servidor se levanto correctamente')
})

// Definimos ruta principal
app.get('/', (req,res) => {
    res.send('Hola Cintia')
})