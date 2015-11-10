var express = require('express'),
    router = express.Router(),
    config = require('../../config/config'),
    crypto = require('crypto'),
    queries = require('../queries/index.js'),
    db = require('../models');

module.exports = function (app) {

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/', router);

    router.get('/registro', function (request, response, next) {
            var error = (typeof request.query.error == 'undefined')? request.query.error : false;
            response.render('registro', {
              error: error
            });
    });
    router.post('/registro', function (request, response, next) {
      console.log(request.body);
      queries.login_y_registro.buscar_estudiantes.then(function(resultado_estudiantes){
        console.log("resultado estudiantes:", resultado_estudiantes);
        if(typeof resultado_estudiantes !== 'undefined' && resultado_estudiantes.length > 0) {
          console.log("no vacio");
        for(user in resultado_estudiantes){
          //console.log(resultado_estudiantes[user]);
          if(resultado_estudiantes[user].dataValues.EST_ID != request.body.rut){
            next();
          }
          }
        }
        else{
          console.log("vacio");
          next();
        }
      })


    }, function(request, response, next){
      //console.log("funcion next", request);
      if(request.body.contrasena == request.body.contrasena2){
        var contrasena_hasheada = request.body.contrasena;
         crypto
             .createHmac("sha1", config.palabra_secreta)
             .update(contrasena_hasheada)
             .digest('hex');
        console.log("contrasenas iguales", contrasena_hasheada);
        queries.login_y_registro.insertar_un_estudiante(request.body.rut, request.body.nombre, request.body.email, contrasena_hasheada);
        request.session.name=  request.body.rut;
        response.redirect("menu");
      } else{
        response.redirect("registro?error=true");
      }
  });
};
