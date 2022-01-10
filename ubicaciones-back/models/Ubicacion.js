const mongoose = require('mongoose');

const UbicacionSchema = mongoose.Schema({
    rubro: {type: String, required: true},
    direccion: {type: String, required: true},
    localidad: {type: String, required: true},
    fechaCreacion: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Ubicacion', UbicacionSchema);