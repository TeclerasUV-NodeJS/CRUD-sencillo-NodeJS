var express = require('express'),
    router = express.Router(),
    consultasindex = require('../queries/login_y_registro.js'),
    db = require('../models');

module.exports = function (app) {

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/', router);

    router.get('/', function (req, res, next) {
            res.render('login', {
            });
    });
    router.post('/login', function (req, res, next) {
      consultasindex.consultas.buscarUsuarios.then(function(resultado_usuarios){
        console.log(resultado_usuarios);
        res.redirect("menu");
      })


    });
};
