var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  mocha = require('gulp-mocha');

/*significa que primero se ejecuta iniciar, y luego watch-folders, es decir, watch-folders depende de iniciar, se rompe lo asíncrono
*/
gulp.task('watch-folders', ['iniciar'] , function() {
  /*Acá están los archivos a vigilar, en caso de cambio, se ejecuta iniciar
  */
  var watcher = gulp.watch(['config/*.js', 'app/**/.js'], ['iniciar']);
  /*esto termina el watcher después un segundo, para ahorrar recursos
  */
    var timeout = setTimeout(watcher.end, 1000);
/*cuando el watcher se apaga por el timeout, esto reinicia el timeout y vuelve a arrancar todo
*/
    watcher.on('change', function() {
        clearTimeout(timeout);
        timeout = setTimeout(watcher.end, 1000);
    });
});

gulp.task('iniciar', function() {
  nodemon({
    script: 'app.js',
    ext: 'js ejs'
  })
});
/*al ejecutar "gulp" a secas, se ejecuta la tarea default, de lo contrario hay que ejecutar
gulp tarea, ejemplo:
gulp iniciar
*/
gulp.task('default', [
  'watch-folders'
]);

/*Test mocha, este task puede ejecutarse asíncronamente (al mismo tiempo), ya que no depende de nadia
*/
gulp.task('test', function() {

  return gulp.src('test.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .once('end', function () {
        process.exit();
    });

});


module.exports = gulp;
