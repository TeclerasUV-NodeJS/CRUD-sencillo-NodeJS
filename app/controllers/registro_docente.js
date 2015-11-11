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

  router.get('/registrodocente', function(request, response, next) {
    var error = (typeof request.query.error == 'undefined') ? request.query.error : false;
    response.render('registrodocente', {
      error: error
    });
  });
  router.post('/registrodocente', function(request, response, next) {
    console.log(request.body);
    queries.login_y_registro.buscar_docentes.then(function(resultado_docente) {
      console.log("resultado_docente: ", resultado_docente);
      if (resultado_docente != null && resultado_docente.length > 0) {
        console.log("no vacio");
        for (user in resultado_docente) {
          //console.log(resultado_docente[user]);
          if (resultado_docente[user].dataValues.DOC_ID != request.body.rut) {
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
    //console.log("funcion next", request);
    if (request.body.contrasena == request.body.contrasena2) {
      var pass_hasheada = crypto
        .createHmac("sha1", config.palabra_secreta)
        .update(request.body.contrasena)
        .digest('hex');
      console.log("pass_hasheada: ", pass_hasheada);
      queries.login_y_registro.insertar_un_docente(request.body.rut, request.body.nombre, request.body.email, pass_hasheada);
      request.session.name = request.body.rut;
      request.session.tipo = "docente";
      response.redirect("menu");
    } else {
      response.redirect("registrodocente?error=true");
    }
  });
};
