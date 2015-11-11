var express = require('express'),
  router = express.Router(),
  auth = require("../middleware/auth.js"),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/consultar', auth, function(request, response, next) {
    var datos_prueba = [{
      nombre: "Erick",
      apellido: "Merino"
    }, {
      nombre: "Hola",
      apellido: "Chao"
    }]

    queries.consultas.buscar_asignaturas.then(function(asignaturas_res){
      var asignaturas = [];
      for(i in asignaturas_res){
        asignaturas.push({
          enlace: "/consultaruno/"+asignaturas_res[i].dataValues.ASI_ID,
          id: asignaturas_res[i].dataValues.ASI_ID,
          nombre: asignaturas_res[i].dataValues.ASI_NOMBRE,
          codigo: asignaturas_res[i].dataValues.ASI_CODIGO
        })
      }
      response.render('consultar', {
        datos: datos_prueba,
        asignaturas: asignaturas
      });
    })

  });
}
