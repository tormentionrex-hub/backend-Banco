const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cuenta extends Model {
    static associate(models) {
      Cuenta.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });
      Cuenta.hasMany(models.Tarjeta, {
        foreignKey: 'cuenta_id',
        as: 'tarjetas',
      });
      Cuenta.hasMany(models.Movimiento, {
        foreignKey: 'cuenta_id',
        as: 'movimientos',
      });
      Cuenta.hasMany(models.Prestamo, {
        foreignKey: 'cuenta_id',
        as: 'prestamos',
      });
    }
  }

  Cuenta.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      numero_cuenta: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      tipo_cuenta: {
        type: DataTypes.ENUM('ahorro', 'corriente'),
        allowNull: false,
      },
      saldo: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      moneda: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'USD',
      },
      estado: {
        type: DataTypes.ENUM('activa', 'inactiva', 'bloqueada'),
        allowNull: false,
        defaultValue: 'activa',
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cuenta',
      tableName: 'cuentas',
      timestamps: true,
    }
  );

  return Cuenta;
};
