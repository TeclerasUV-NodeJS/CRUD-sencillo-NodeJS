var db = require('../models');

exports.consultas = {
  buscar_estudiantes: db.TV_ESTUDIANTE.findAll({
    attributes: ['EST_ID', 'EST_CORREO', 'EST_NOMBRE', 'EST_PASSWORD']
  }),
  insertar_un_estudiante: function(rut, nombre, correo, contrasena) {
    return db.TV_ESTUDIANTE
      .build({
        EST_ID: rut,
        EST_NOMBRE: nombre,
        EST_CORREO: correo,
        EST_PASSWORD: contrasena
      })
      .save()
      .then(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        console.log(anotherTask);
      }).catch(function(error) {
        // Ooops, do some error-handling
        console.log(error);
      })
  },
  buscar_docentes: db.TV_DOCENTE.findAll(),
  insertar_un_docente: function(rut, nombre, correo, contrasena) {
    return db.TV_DOCENTE
      .build({
        DOC_ID: rut,
        DOC_NOMBRE: nombre,
        DOC_CORREO: correo,
        DOC_PASSWORD: contrasena
      })
      .save()
      .then(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        console.log(anotherTask);
      }).catch(function(error) {
        // Ooops, do some error-handling
        console.log(error);
      })
  }
}
