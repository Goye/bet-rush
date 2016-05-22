var gulp = require('gulp');
var config = require('../gulp.config')();

gulp.task('copy:index', function() {
  gulp.src(config.indexHtml)
    .pipe(gulp.dest(config.dist));
});

gulp.task('copy:views', function() {
  gulp.src(config.views.templates)
    .pipe(gulp.dest(config.dist + 'views/'));
});

gulp.task('copy:images', function() {
  gulp.src(config.images.app)
    .pipe(gulp.dest(config.images.dist));
});

gulp.task('copy:fonts', function() {
  gulp.src(config.fonts.app)
    .pipe(gulp.dest(config.fonts.dist));
});
