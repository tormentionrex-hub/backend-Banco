module.exports = {
  development: {
    username: 'root',
    password: '1234',
    database: 'banco_db',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-06:00',
  },
  test: {
    username: 'root',
    password: '1234',
    database: 'banco_db_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-06:00',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '-06:00',
  },
};
