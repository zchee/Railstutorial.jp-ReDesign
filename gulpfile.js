'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var run = require('gulp-run');


var config = {
  app: 'app',
  dist: 'dist',
  sass: 'app/styles/*.scss',
  css: 'app/styles/',
  script: 'app/scripts/*.js',
  html: 'app/*.html'
};


gulp.task('default', function() {
  gulp.watch([config.sass], ['style', 'extension-reload']);
  gulp.watch([config.script], ['script', 'extension-reload']);
  gulp.watch([config.html], ['html', 'extension-reload']);
});


// Bower -------------------------------------
gulp.task('bower', function() {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./bower_components'))
    .pipe($.size({
      title: 'bower'
    }));
});

gulp.task('bower:clean',
  del.bind(null, ['./bower_components'])
);


// Compile and Automatically Prefix ----------------
gulp.task('style', function() {
  return gulp.src([config.sass])
    .pipe($.rubySass())
    .on('error', function(err) {
      console.error('Error', err.message);
    })
    .pipe(gulp.dest(config.css))
    .pipe(reload({
      stream: true
    }))
    .pipe($.size({
      title: 'style'
    }));
});

gulp.task('extension-reload', ['style'], function() {
  run('open -g http://reload.extensions && sleep 1 && chrome-canary-cli reload').exec();
});

// Concatenate And Minify ------------------------
gulp.task('script', function() {
  return gulp.src('js/**/.js')
    .pipe(gulp.dest('dist/'))
    .pipe($.size({
      title: 'script'
    }));
});

// Edited php file after reload browsers
gulp.task('html', function() {
  return gulp.src('./**/*.html');
});

// serve -----------------------------------------
// Build and serve the output from the dist build

// Watch Files For Changes & Reload Vagrant Server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    open: false,
    notify: false,
  });
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch([config.sass], ['style', 'extension-reload']);
  gulp.watch([config.script], ['script', reload]);
  gulp.watch([config.html], ['html', reload]);
});
