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
/*La otra forma de recibir parámetros en un GET además de params, es con query, y es cuando la url es de la forma:
miurl?mivar=1&mivar2=3
*/
  router.get('/registrodocente', function(request, response, next) {
    /*las variables de query pueden estar o no estar, por eso se comprueba si existe, esto es un operador ternario, existe en casi todos los lenguajes.
    condicion? resultado si verdadero :  resultado si falso
    */
    var error = (typeof request.query.error == 'undefined') ? request.query.error : false;
    response.render('registrodocente', {
      error: error
    });
  });
  router.post('/registrodocente', function(request, response, next) {
    console.log(request.body);
    /*Recordar que las consultas en sequelize se trabajan como callbacks, como todo en javascriptxD
    */
    queries.login_y_registro.buscar_docentes.then(function(resultado_docente) {
      console.log("resultado_docente: ", resultado_docente);
      if (resultado_docente != null && resultado_docente.length > 0) {
        console.log("no vacio");
        for (user in resultado_docente) {
          if (resultado_docente[user].dataValues.DOC_ID != request.body.rut) {
            /*las funciones middleware pueden servir para autorización, o también para ahorrar código
            */
            next();
          }
        }
        response.redirect("/");
      } else {
        console.log("vacio");
        /*Aunque quizás sea mejor definir una función dentro de esta xD es más estándar, como lo hice con el login. Dejo esta alternativa que no es para nada buenas prácticas usar next() para esto, ahora me da flojera hacerlo con buenas prácticas
        */
        /*Debería declarar una función debajo, antes que termine el callback, o arriba, y llamarla desde acá
        */
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
      /*Luego de insertarlo, se le inicia automáticamente su sesión*/
      request.session.name = request.body.rut;
      request.session.tipo = "docente";
      response.redirect("menu");
    } else {
      response.redirect("registrodocente?error=true");
    }
  });
};
