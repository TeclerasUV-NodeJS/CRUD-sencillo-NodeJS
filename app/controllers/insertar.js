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

  router.get('/insertar', auth, function(request, response, next) {
    response.render('insertar', {});
  });
  router.post("/insertar", function(request, response, next) {
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
