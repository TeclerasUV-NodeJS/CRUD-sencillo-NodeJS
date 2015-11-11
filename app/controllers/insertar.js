var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/insertar', auth_docente, function(request, response, next) {
    response.render('insertar', {});
  });
  router.post("/insertar", auth_docente, function(request, response, next) {
    queries.inserts.insertar_asignatura(request.body.id, request.body.nombre, request.body.codigo)
      .catch(function(error) {
        // Ooops, do some error-handling
        console.log(error);
        response.redirect("/insertar");
        next();
      })
    response.redirect("/consultar");
  })
}
