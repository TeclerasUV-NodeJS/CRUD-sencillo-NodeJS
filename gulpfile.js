var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  mocha = require('gulp-mocha');

gulp.task('watch-folders', ['iniciar'] , function() {
  var watcher = gulp.watch(['config/*.js', 'app/**/.js'], ['iniciar']);
    var timeout = setTimeout(watcher.end, 1000);

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

gulp.task('default', [
  'watch-folders'
]);

// Mocha testing
gulp.task('test', function() {

  return gulp.src('test.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .once('end', function () {
        process.exit();
    });
  
});


module.exports = gulp;