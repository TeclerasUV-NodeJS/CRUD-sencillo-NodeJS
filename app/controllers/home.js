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

  router.get('/', function(request, response, next) {
    //console.log(queries);
    if (typeof request.session != 'undefined' && typeof request.session.name != 'undefined') {
      response.redirect("menu");
    } else {
      response.render('login', {});
    }
  });
  router.post('/login', function(request, response, next) {
    //console.log(queries);
    var ruta="/";
    var pass_hasheada= crypto
      .createHmac("sha1", config.palabra_secreta)
      .update(request.body.contrasena)
      .digest('hex');
    switch (request.body.docoest) {
      case 'docente':
          login_docente();
        break;
      case 'estudiante':
          login_estudiante();
        break;

    }
    function login_estudiante(){
    queries.login_y_registro.buscar_estudiantes.then(function(resultado_estudiantes) {
      console.log(resultado_estudiantes);
      if (resultado_estudiantes != null && resultado_estudiantes.length>0) {
        console.log("no vacio");
        for (user in resultado_estudiantes) {
          var contrasena_bd = resultado_estudiantes[user].dataValues.EST_PASSWORD;
          //console.log(resultado_estudiantes[user]);
          if (resultado_estudiantes[user].dataValues.EST_ID == request.body.rut && contrasena_bd == pass_hasheada) {
            request.session.name = request.body.rut;
            request.session.tipo="estudiante";
            ruta="/menu";
          }
        }
      }
response.redirect(ruta);

    })
  }
  function login_docente(){
  queries.login_y_registro.buscar_docentes.then(function(resultado_docentes) {
    console.log(resultado_docentes);
    if (resultado_docentes != null && resultado_docentes.length>0) {
      console.log("no vacio");
      for (user in resultado_docentes) {
        var contrasena_bd = resultado_docentes[user].dataValues.DOC_PASSWORD;
        console.log(resultado_docentes[user].dataValues);
        if (resultado_docentes[user].dataValues.DOC_ID == request.body.rut && contrasena_bd == pass_hasheada) {
          request.session.name = request.body.rut;
          request.session.tipo="docente";
          ruta="/menu";
        }
      }
    }
    response.redirect(ruta);
  })
}


  });
};
