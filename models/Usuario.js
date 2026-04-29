const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Cuenta, {
        foreignKey: 'usuario_id',
        as: 'cuentas',
      });
      Usuario.hasMany(models.Prestamo, {
        foreignKey: 'usuario_id',
        as: 'prestamos',
      });
    }
  }

  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'bloqueado'),
        allowNull: false,
        defaultValue: 'activo',
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: true,
    }
  );

  return Usuario;
};
