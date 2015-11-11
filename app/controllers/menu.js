var express = require('express'),
  router = express.Router(),
  auth = require("../middleware/auth.js"),
  queries = require('../queries/index.js'),
  db = require('../models');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/menu', auth, function(request, response, next) {
    response.render('menu', {});
  });
  router.post('/signout', auth, function(request, response, next) {
    request.session.name=undefined;
    response.redirect("/");
  });
}
