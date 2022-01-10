// Rutas para ubicacion
const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');

// api/ubicaciones
router.post('/', ubicacionController.crearUbicacion);
router.get('/', ubicacionController.listarUbicaciones);
router.put('/:id', ubicacionController.editarUbicacion);
router.get('/:id', ubicacionController.listarUbicacion);
router.delete('/:id', ubicacionController.eliminarUbicacion);

module.exports = router;