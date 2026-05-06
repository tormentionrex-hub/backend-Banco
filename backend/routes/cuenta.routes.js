const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuenta.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', [verifyToken, isAdmin], cuentaController.createCuenta);
router.get('/:id', [verifyToken], cuentaController.getCuenta);

module.exports = router;
