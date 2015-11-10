var express = require('express'),
    router = express.Router(),
    consultasindex = require('../queries/login_y_registro.js'),
    db = require('../models');

module.exports = function (app) {

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/', router);

    router.get('/consultar', function (req, res, next) {
      var datos_prueba= [
        {nombre: "Erick",
        apellido: "Merino"},
        {nombre: "Hola",
        apellido: "Chao"}
      ]
            res.render('consultar', {
              datos: datos_prueba
            });
    });
  }
