const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccion.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/deposito', [verifyToken], transaccionController.deposito);
router.post('/retiro', [verifyToken], transaccionController.retiro);
router.post('/transferencia', [verifyToken], transaccionController.transferencia);

module.exports = router;
