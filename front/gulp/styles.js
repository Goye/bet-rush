var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulp.config')();
var args = require('yargs').argv;

gulp.task('styles:dev', function() {
  console.log('compile scss to css');

  return gulp.src(config.styles.sass)
    .pipe($$.sourcemaps.init())
    .pipe($$.sass())
    .pipe($$.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe($$.sourcemaps.write())
    .pipe(gulp.dest(config.styles.dev))
    .pipe($$.livereload());
});

gulp.task('styles:prod', function() {
  console.log('compile scss to css');

  return gulp.src(config.styles.sass)
    .pipe($$.sass())
    .pipe($$.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe($$.csso())
    .pipe(gulp.dest(config.styles.dist));
});
