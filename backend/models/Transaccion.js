const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transaccion extends Model {
    static associate(models) {
      Transaccion.hasMany(models.Movimiento, {
        foreignKey: 'transaccion_id',
        as: 'movimientos',
      });
    }
  }

  Transaccion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo: {
        type: DataTypes.ENUM('deposito', 'retiro', 'transferencia'),
        allowNull: false,
      },
      monto_total: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM('pendiente', 'completada', 'fallida'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
    },
    {
      sequelize,
      modelName: 'Transaccion',
      tableName: 'transacciones',
      timestamps: true,
    }
  );

  return Transaccion;
};
