var db = require('../models');

exports.consultas = {
  buscarUsuarios : db.TV_ESTUDIANTE.findAll({
    attributes: ['EST_ID', 'EST_CORREO', 'EST_NOMBRE', 'EST_PASSWORD']
  })
}
