/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_ESTUDIANTE', {
    EST_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    EST_CORREO: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EST_NOMBRE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EST_PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
