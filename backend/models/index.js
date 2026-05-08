const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    timezone: dbConfig.timezone,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Rol          = require('./Rol')(sequelize);
db.Usuario      = require('./Usuario')(sequelize);
db.Cuenta       = require('./Cuenta')(sequelize);
db.Tarjeta      = require('./Tarjeta')(sequelize);
db.Transaccion  = require('./Transaccion')(sequelize);
db.Movimiento   = require('./Movimiento')(sequelize);
db.Prestamo     = require('./Prestamo')(sequelize);
db.PagoPrestamo = require('./PagoPrestamo')(sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

module.exports = db;
