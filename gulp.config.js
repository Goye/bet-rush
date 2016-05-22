'use strict';
module.exports = function() {
  var root = './';
  var gulpTasks = './gulp/';
  var app = './app/';
  var dist = './public/';
  var server = './app.js';
  var bower = './bower_components/';
  var config = {
    root: root,
    app: app,
    dist: dist,
    server: server,
    source: 'app/',
    gulpTasks: gulpTasks + '**/*.js',
    allJs: ['./app/scripts/**/*.js', './*.js'],
    indexHtml: app + 'index.html',
    styles: {
      sass: app + 'styles/main.sass',
      allSass: app + 'styles/**/*.sass',
      dist: dist + 'styles/',
      dev: dist + 'styles/'
    },
    scripts: {
      js: app + 'scripts/**/*.js',
      dist: dist + 'scripts/',
      dev: dist + 'scripts/'
    },
    images: {
      app: app + 'images/**/*',
      dist: dist + 'images'
    },
    views: {
      templates: app + 'views/**/*.html',
      app: app + 'views/templates/'

    },
    fonts: {
      app: app + 'fonts/**/*',
      dist: dist + 'fonts/'

    }
  };
  return config;
};
