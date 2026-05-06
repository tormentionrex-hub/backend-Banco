const express = require('express');
const cors = require('cors');
const db = require('./models');
const usuarioRoutes = require('./routes/usuario.routes');
const cuentaRoutes = require('./routes/cuenta.routes');
const transaccionRoutes = require('./routes/transaccion.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cuentas', cuentaRoutes);
app.use('/api/transacciones', transaccionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
