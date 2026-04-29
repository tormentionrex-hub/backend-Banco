const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Prestamo extends Model {
    static associate(models) {
      Prestamo.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });
      Prestamo.belongsTo(models.Cuenta, {
        foreignKey: 'cuenta_id',
        as: 'cuenta',
      });
      Prestamo.hasMany(models.PagoPrestamo, {
        foreignKey: 'prestamo_id',
        as: 'pagos',
      });
    }
  }

  Prestamo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      monto_solicitado: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      monto_aprobado: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      tasa_interes: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      plazo_meses: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cuota_mensual: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM('solicitado', 'aprobado', 'rechazado', 'activo', 'pagado'),
        allowNull: false,
        defaultValue: 'solicitado',
      },
      usuario_id: {
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
      modelName: 'Prestamo',
      tableName: 'prestamos',
      timestamps: true,
    }
  );

  return Prestamo;
};
