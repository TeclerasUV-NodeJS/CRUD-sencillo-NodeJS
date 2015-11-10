var tasks = Object.keys(require('gulp').tasks),
	connect = require('gulp-connect'),
  port = 3000,
  server = require('./app.js'),
  request = require('superagent'),
  expect = require('chai').expect;
//console.log(expect);
var app;
app = server();
//console.log(tasks);
  describe('test/', function(){
    
    it('should homepage respond to GET',function(done){
      this.timeout(5000);
      setTimeout(done, 5000);
      request
        .get('http://localhost:3000')
        .end(function(err, res){
          console.log("termino /");
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          console.log("lo logramos /");
          done();
      })

    })
    after(function () {
    console.log("cerrando");
    return 
    app.close();
  });
  });
  describe('remedio', function(){
    it('should remedio respond to GET',function(done){
       this.timeout(5000);
      setTimeout(done, 5000);
      request
        .get('http://localhost:3000/remedio')
        .query({remedios: 'Loratadina', ciudad: 37})
        .end(function(err, res){
          console.log("termino remedio");
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          console.log("lo logramos remedio");
          done();

      })

    })
    after(function () {
    console.log("cerrando");
    return 
    app.close();
  });
  });