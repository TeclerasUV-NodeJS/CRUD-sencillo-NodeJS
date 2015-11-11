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

  router.get('/consultaruno/:idasignatura', auth, function(request, response, next) {
    queries.consultas.buscar_una_asignatura(request.params.idasignatura).then(function(asignatura_res) {
      var asignatura;
      console.log("asignatura_res uno",asignatura_res);
      if (asignatura_res != null) {
      asignatura = {
        id: asignatura_res.dataValues.ASI_ID,
        nombre: asignatura_res.dataValues.ASI_NOMBRE,
        codigo: asignatura_res.dataValues.ASI_CODIGO
      }
      console.log("asignaturauno:",asignatura);
    }else{
      asignatura ={};
    }
      response.render('consultaruno', {
        asignatura: asignatura
      });
    })
  });
}
