const Ubicacion = require("../models/Ubicacion");

exports.crearUbicacion = async (req,res) => {
    try {
        let ubicacion;

        ubicacion = new Ubicacion(req.body); // Creamos la ubicacion

        await ubicacion.save();
        res.send(ubicacion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error. Culpa de Cintia')
    }
}