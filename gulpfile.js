/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-06-06T17:37:38+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-06T20:43:35+02:00
* @License: MIT
*/

'use strict';

var gulp          = require('gulp'),
    childProcess  = require('child_process'),
    electron      = require('electron-prebuilt'),
    jetpack       = require('fs-jetpack'),
    usemin        = require('gulp-usemin'),
    uglify        = require('gulp-uglify'),
    electronco     = require('electron-connect').server.create({
      path: './app'
    });

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

gulp.task('run', function () {
  childProcess.spawn(electron, ['./app'], { stdio: 'inherit' });
});

gulp.task('clean', function () {
  return destDir.dirAsync('.', { empty: true });
});

gulp.task('copy', ['clean'], function () {
  return projectDir.copyAsync('app', destDir.path(), {
    overwrite: true, matching: [
        './node_modules/**/*',
        '*.html',
        '*.css',
        'main.js',
        'package.json'
   ]
  });
});

gulp.task('serve', function () {

  // Start browser process
  electronco.start('./app');

  // Restart browser process
  gulp.watch('./app/main.js', electronco.restart);

  // Reload renderer process
  gulp.watch(['./app/assets/**/*.css', './app/scripts/**/*.*', './app/index.html'], electronco.reload);
});

gulp.task('build', ['copy'], function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      js: [uglify()]
    }))
    .pipe(gulp.dest('build/'));
});
