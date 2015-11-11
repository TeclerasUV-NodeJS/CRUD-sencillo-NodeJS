

var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models');

var app = express();

require('./config/express')(app, config);
app.use('/public', express.static(__dirname + '/public'));

db.sequelize
  .sync()
  .then(function () {
    app.listen(config.port);
  }).catch(function (e) {
    throw new Error(e);
  });

var createServer = {
  run: function() {
  db.sequelize
	  .sync()
	  .then(function () {
	    app.listen(3000);
	  }).catch(function (e) {
	    throw new Error(e);
  });
},
  miapp: app
};

module.exports = createServer;
