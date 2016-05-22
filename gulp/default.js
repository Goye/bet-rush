var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
  runSequence(
    'scripts:dev',
    'styles:dev',
    'copy:index',
    'copy:views',
    'copy:images',
    'server:start',
    'watch',
    cb
  );
});
