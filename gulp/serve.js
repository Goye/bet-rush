var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var $$ = require('gulp-load-plugins')();
var config = require('../gulp.config')();

gulp.task('server:start', function() {
  //$$.express.run(config.server);
  nodemon({ 
    script: 'app.js'
  })
  .on('restart', function () {
    console.log('restarted!')
  });
});
