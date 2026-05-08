const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Cualquier usuario autenticado puede ver los roles (necesario para el formulario de crear usuario)
router.get('/', verifyToken, rolController.listRoles);

// Solo administrador puede crear o modificar roles
router.post('/', [verifyToken, isAdmin], rolController.createRol);
router.put('/:id', [verifyToken, isAdmin], rolController.updateRol);

module.exports = router;
