const Ubicacion = require("../models/Ubicacion");

exports.crearUbicacion = async (req,res) => {
    try {
        let ubicacion;

        ubicacion = new Ubicacion(req.body); // Creamos la ubicacion
 
        await ubicacion.save();
        res.send(ubicacion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.')
    }
}

exports.listarUbicaciones = async (req,res) => {
    try {
        const ubicaciones = await Ubicacion.find();
        res.json(ubicaciones);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.')
    }
}

exports.editarUbicacion = async (req,res) => {
    try {
        const { rubro, direccion, localidad, latitud, longitud } = req.body;
        let ubicacion = await Ubicacion.findById(req.params.id);

        if(!ubicacion){ 
            res.status(404).json({ msg: 'No existe la ubicacion'})
        }

        ubicacion.rubro = rubro;
        ubicacion.direccion = direccion;
        ubicacion.localidad = localidad;
        ubicacion.latitud = latitud;
        ubicacion.longitud = longitud;

        ubicacion = await Ubicacion.findOneAndUpdate({_id: req.params.id}, ubicacion, { new: true})
        res.json(ubicacion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.')
    }
}

exports.listarUbicacion = async (req,res) => {
    try {
        let ubicacion = await Ubicacion.findById(req.params.id);

        if(!ubicacion){ 
            res.status(404).json({ msg: 'No existe la ubicacion'})
        }

        res.json(ubicacion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.')
    }
}

exports.eliminarUbicacion = async (req,res) => {
    try {
        let ubicacion = await Ubicacion.findById(req.params.id);

        if(!ubicacion){ 
            res.status(404).json({ msg: 'No existe la ubicacion'})
        }

        await Ubicacion.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Ubicacion eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.')
    }
}