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

  router.get('/administrar_asignatura', auth, function(request, response, next) {
    queries.consultas.buscar_una_asignatura(request.query.idasignatura).then(function(asignatura_res) {
      var asignatura;
      console.log(asignatura_res);
      if (asignatura_res != null) {
       asignatura = {
        id: asignatura_res.dataValues.ASI_ID,
        nombre: asignatura_res.dataValues.ASI_NOMBRE,
        codigo: asignatura_res.dataValues.ASI_CODIGO
      }
    }else{
      asignatura ={};
    }
      response.render('administrar_asignatura', {
        asignatura: asignatura
      });
    })
  })
  router.post('/administrar_asignatura', function(request, response, next) {
    switch (request.body.opcion) {
      case 'volver':
        response.redirect("/menu");
        break;
      case 'modificar':
        queries.updates.actualizar_asignatura(request.body.id, request.body.nombre, request.body.codigo);
        break;
      case 'eliminar':
        queries.deletes.borrar_asignatura_por_id(request.body.id);
        break;
      default:
        console.log("error");
        break;
    }
    response.redirect("/consultar");
  })
}
