const mongoose = require('mongoose');

const UbicacionSchema = mongoose.Schema({
    rubro: {type: String, required: true},
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    localidad: {type: String, required: true},
    provincia: {type: String, required: true},
    pais: {type: String, required: true},
    fechaCreacion: {type: Date, default: Date.now()},
    latitud: {type: Number, required: true},
    longitud: {type: Number, required: true},
});

module.exports = mongoose.model('Ubicacion', UbicacionSchema);