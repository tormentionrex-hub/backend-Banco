const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { verifyToken, isAdmin, isAdminOrModerador } = require('../middlewares/auth.middleware');

router.get('/', [verifyToken, isAdminOrModerador], usuarioController.listUsuarios);
router.post('/', [verifyToken, isAdmin], usuarioController.createUsuario);
router.get('/:id', [verifyToken], usuarioController.getUsuario);
router.put('/:id/rol', [verifyToken, isAdmin], usuarioController.updateRolUsuario);

module.exports = router;
