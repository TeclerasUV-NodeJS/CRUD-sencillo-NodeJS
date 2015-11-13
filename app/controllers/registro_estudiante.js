var express = require('express'),
  router = express.Router(),
  config = require('../../config/config'),
  crypto = require('crypto'),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/registroestudiante', function(request, response, next) {
    var error = (typeof request.query.error == 'undefined') ? request.query.error : false;
    response.render('registroestudiante', {
      error: error
    });
  });
  router.post('/registroestudiante', function(request, response, next) {
    console.log(request.body);
    queries.login_y_registro.buscar_estudiantes.then(function(resultado_estudiantes) {
      console.log("resultado estudiantes:", resultado_estudiantes);
      if (resultado_estudiantes != null && resultado_estudiantes.length > 0) {
        console.log("no vacio");
        for (user in resultado_estudiantes) {
          if (resultado_estudiantes[user].dataValues.EST_ID != request.body.rut) {
            next();
          }
        }
        response.redirect("/");
      } else {
        console.log("vacio");
        next();
      }
    })


  }, function(request, response, next) {
    if (request.body.contrasena == request.body.contrasena2) {
      var pass_hasheada = crypto
        .createHmac("sha1", config.palabra_secreta)
        .update(request.body.contrasena)
        .digest('hex');
      console.log("pass_hasheada: ", pass_hasheada);
      queries.login_y_registro.insertar_un_estudiante(request.body.rut, request.body.nombre, request.body.email, pass_hasheada);
      request.session.name = request.body.rut;
      request.session.tipo = "estudiante";
      response.redirect("menu");
    } else {
      response.redirect("registroestudiante?error=true");
    }
  });
};
