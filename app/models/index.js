var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {};

//db, user, pw
var sequelize = new Sequelize('sql396080', 'sql396080', 'xE1!mJ2!', {
  host: 'sql3.freesqldatabase.com',
  dialect: 'mysql',
  autoIncrement: true,
  pool: {
    max: 50,
    min: 0,
    idle: 10
  },
  define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true
  }

});
/*
var sequelize = new Sequelize(config.db, "root", "", {
  storage: config.storage
});*/

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//asociaciones creadas a mano, el generador no las hace. También podrían ir en un archivo separado y exportarlo.
db.TV_ASISTENCIA_CLASE.belongsTo(db.TV_ESTUDIANTE);
db.TV_ASISTENCIA_CLASE.belongsTo(db.TV_CLASE);
db.TV_CLASE.belongsTo(db.TV_PARALELO);
db.TV_PARALELO.belongsTo(db.TV_ASIGNATURA);
db.TV_PARALELO.belongsTo(db.TV_DOCENTE);
db.TV_PREGUNTA_MAESTRA.belongsTo(db.TV_PARALELO);
db.TV_PREGUNTA_REALIZADA.belongsTo(db.TV_PREGUNTA_MAESTRA);
db.TV_PREGUNTA_REALIZADA.belongsTo(db.TV_CLASE);
db.TV_PREGUNTA_RESPONDIDA.belongsTo(db.TV_PREGUNTA_REALIZADA);
db.TV_PREGUNTA_RESPONDIDA.belongsTo(db.TV_ESTUDIANTE);
db.TV_PREGUNTA_RESPONDIDA.belongsTo(db.TV_RESPUESTAS);
db.TV_RESPUESTAS.belongsTo(db.TV_PREGUNTA_MAESTRA);

module.exports = db;
