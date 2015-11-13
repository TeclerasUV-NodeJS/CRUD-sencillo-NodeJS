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
    /*Esto comprueba que no esté logueado
    */
    if (typeof request.session != 'undefined' && typeof request.session.name != 'undefined') {
      /*Si está logueado, manda a menu
      */
      response.redirect("menu");
    } else {
      /*Si no está logueado, manda a loguearse
      */
      response.render('login', {});
    }
  });
  router.post('/login', function(request, response, next) {
    var ruta="/";
    /*Esto crea una contraseña encriptada de seguridad decente, usando una palabra clave definida en el archivo config/config
    */
    var pass_hasheada= crypto
      .createHmac("sha1", config.palabra_secreta)
      .update(request.body.contrasena)
      .digest('hex');
      /*El radio, según lo que sea, manda a distintas funciones, esto es mucho mejor que copiar el código en el case, no estamos en primer año xD
      */
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
      /*comprobación que el resultado no sea null y que sea un arreglo no vacío
      Recordar que no puedo verificar un método o atributo de un objeto sin antes verificar que el objeto exista, de lo contrario dará error de tipo "no se puede saber length de undefined"
      */
      if (resultado_estudiantes != null && resultado_estudiantes.length>0) {
        console.log("no vacio");
        for (user in resultado_estudiantes) {
          var contrasena_bd = resultado_estudiantes[user].dataValues.EST_PASSWORD;
          if (resultado_estudiantes[user].dataValues.EST_ID == request.body.rut && contrasena_bd == pass_hasheada) {
            /*Podría haber usado librerías para sesion, como passport (que entre otras cosas permite conectarse a fb, google, local, y conectar todas las cuentas), pero ni yo ni ustedes teníamos el ánimo de aprender más API's, así que lo hice de la forma más artesanal que pude... escribiendo en las coockies
            */
            request.session.name = request.body.rut;
            request.session.tipo="estudiante";
            ruta="/menu";
          }
        }
      }
      /*No se debe mandar más de un redirect, aunque creamos que después de redireccionar una vez termina, no es así, y mandará un error de headers (renderizará igual la página, pero con errores), así que por eso, si quieren mandar más de un redirect, hagan lo que hice, cambian la variable de la ruta y al final de todo mandan el redirect. Recordar que no se debe mandar después que termine el callback o no se ejecutará nunca (recordar qué son los callback).
      */
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
