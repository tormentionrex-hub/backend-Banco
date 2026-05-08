const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Tarjeta extends Model {
    static associate(models) {
      Tarjeta.belongsTo(models.Cuenta, {
        foreignKey: 'cuenta_id',
        as: 'cuenta',
      });
    }
  }

  Tarjeta.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      numero_tarjeta: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
      },
      tipo: {
        type: DataTypes.ENUM('debito', 'credito'),
        allowNull: false,
        validate: {
          isIn: [['debito', 'credito']]
        }
      },
      fecha_expiracion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      limite_credito: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM('activa', 'bloqueada', 'cancelada'),
        allowNull: false,
        defaultValue: 'activa',
      },
      cuenta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tarjeta',
      tableName: 'tarjetas',
      timestamps: true,
    }
  );

  return Tarjeta;
};
