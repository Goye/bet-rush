var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulp.config')();
var args = require('yargs').argv;

gulp.task('scripts:dev',function() {
  return gulp.src(config.scripts.js)
    .pipe($$.jscs())
    .pipe($$.jscs.reporter())
    .pipe($$.jshint())
    .pipe($$.jshint.reporter('default'))
    .pipe($$.sourcemaps.init())
    .pipe($$.ngAnnotate())
    .pipe($$.order([
      'app/scripts/main.js',
      'app/scripts/**/*.module.js',
      'app/scripts/**/*.service.js',
      'app/scripts/**/*.controller.js',
      'app/scripts/**/*.directive.js'
    ], {base: '.'}))
    .pipe($$.concat('main.js'))
    .pipe($$.sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dev))
    .pipe($$.notify('JS copied'));
});

gulp.task('scripts:prod',function() {
  return gulp.src(config.scripts.js)
    .pipe($$.jscs())
    .pipe($$.jscs.reporter())
    .pipe($$.jshint())
    .pipe($$.jshint.reporter('default'))
    .pipe($$.ngAnnotate())
    .pipe($$.order([
      'app/scripts/main.js',
      'app/scripts/**/*.module.js',
      'app/scripts/**/*.service.js',
      'app/scripts/**/*.controller.js',
      'app/scripts/**/*.directive.js'
    ], {base: '.'}))
    .pipe($$.concat('main.js'))
    .pipe($$.ngmin())
    .pipe(gulp.dest(config.scripts.dev))
    .pipe($$.uglify())
    .pipe(gulp.dest(config.scripts.dev))
    .pipe($$.notify('JS minified'));
});
