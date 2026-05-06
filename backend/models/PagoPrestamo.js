const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PagoPrestamo extends Model {
    static associate(models) {
      PagoPrestamo.belongsTo(models.Prestamo, {
        foreignKey: 'prestamo_id',
        as: 'prestamo',
      });
    }
  }

  PagoPrestamo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      monto_pagado: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      numero_cuota: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_pago: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM('pagado', 'pendiente', 'vencido'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
      prestamo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PagoPrestamo',
      tableName: 'pagos_prestamo',
      timestamps: true,
    }
  );

  return PagoPrestamo;
};
