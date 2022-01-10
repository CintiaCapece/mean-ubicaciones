// Rutas para ubicacion
const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');

// api/ubicaciones
router.post('/', ubicacionController.crearUbicacion);

module.exports = router;