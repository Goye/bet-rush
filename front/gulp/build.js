var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'scripts:prod',
    'styles:prod',
    'copy:index',
    'copy:views',
    'copy:images',
    'copy:fonts',
    'server:start',
    cb
  );
});
