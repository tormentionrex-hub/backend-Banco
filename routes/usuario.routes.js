const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', [verifyToken, isAdmin], usuarioController.createUsuario);
router.get('/:id', [verifyToken], usuarioController.getUsuario);

module.exports = router;
