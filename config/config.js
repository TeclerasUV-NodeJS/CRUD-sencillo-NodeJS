var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
 
//port:3000
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'farmautomatico'
    },
    port: 3000,
    db: 'jdbc:mysql://localhost:3306/farmautomatico'
  },

  test: {
    root: rootPath,
    app: {
      name: 'farmautomatico'
    },
    port: 3000,
    db: 'mysql://localhost/farmautomatico-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'farmautomatico'
    },
    port: 3000,
    db: 'mysql://localhost/farmautomatico-production'
  }
};

module.exports = config[env];