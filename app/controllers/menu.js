var express = require('express'),
    router = express.Router(),
    manejo_sesion = require("../middleware/manejo_sesion.js"),
    consultasindex = require('../queries/login_y_registro.js'),
    db = require('../models');

module.exports = function (app) {

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/', router);

    router.get('/menu', manejo_sesion, function (request, response, next) {
            response.render('menu', {
            });
    });
  }
