var queries = {},
  fs = require('fs'),
  path = require('path');

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'queries.js');
}).forEach(function (file) {
  var ruta_archivo = path.join(__dirname, file);
  var query = require(ruta_archivo);
  name = file.substr(0, file.lastIndexOf('.'));
  queries[name] = query.consultas;
});


  module.exports = queries;
