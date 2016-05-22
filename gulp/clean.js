var gulp = require('gulp');
var del = require('del');
var config = require('../gulp.config')();

gulp.task('clean', function() {
  console.log('Cleaning...');
  del(config.dist);
});
