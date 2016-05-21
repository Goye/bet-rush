var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulp.config')();

gulp.task('watch',function() {
  gulp.watch(config.scripts.js, ['scripts:dev']);
  gulp.watch(config.styles.allSass, ['styles:dev']);
  gulp.watch(config.indexHtml, ['copy:index']);
  gulp.watch(config.views.templates, ['copy:views']);
  gulp.watch(config.fonts.app, ['copy:fonts']);
});
