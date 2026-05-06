const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Movimiento extends Model {
    static associate(models) {
      Movimiento.belongsTo(models.Transaccion, {
        foreignKey: 'transaccion_id',
        as: 'transaccion',
      });
      Movimiento.belongsTo(models.Cuenta, {
        foreignKey: 'cuenta_id',
        as: 'cuenta',
      });
    }
  }

  Movimiento.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo_movimiento: {
        type: DataTypes.ENUM('debito', 'credito'),
        allowNull: false,
      },
      monto: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      transaccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cuenta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movimiento',
      tableName: 'movimientos',
      timestamps: true,
    }
  );

  return Movimiento;
};
