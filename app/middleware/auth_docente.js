var express = require('express'),
    router = express.Router();

module.exports = function(request, response, next){
  if(typeof request.session != 'undefined' && typeof request.session.name != 'undefined' && request.session.tipo=="docente"){
    console.log("sesion válida docente");
    next();
  }else{
    console.log("no ha iniciado sesion");
    response.redirect("/");
  }
}
