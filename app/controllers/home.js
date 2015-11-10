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

    router.get('/', function (request, response, next) {
      console.log(queries);
      if(typeof request.session != 'undefined' && typeof request.session.name != 'undefined'){
            response.redirect("menu");
          }else{
            response.render('login', {
            });

          }
    });
    router.post('/login', function (request, response, next) {
      console.log(queries);
      queries.login_y_registro.buscar_estudiantes.then(function(resultado_estudiantes){
        console.log(resultado_estudiantes);
        if(typeof resultado_estudiantes !== 'undefined' && resultado_estudiantes.length > 0) {
          console.log("no vacio");
        for(user in resultado_estudiantes){
          var contrasena_bd= resultado_estudiantes[user].dataValues.EST_PASSWORD,
              contrasena_ingresada = request.body.contrasena;
          crypto
              .createHmac("sha1", config.palabra_secreta)
              .update(contrasena_ingresada)
              .digest('hex');
            console.log(contrasena_ingresada);
          //console.log(resultado_estudiantes[user]);
          if(resultado_estudiantes[user].dataValues.EST_ID == request.body.rut && contrasena_bd == contrasena_ingresada){
            request.session.name=request.body.rut;
            response.redirect("menu");
          }

          }
        }
          response.redirect("/");
      })
    });
};
