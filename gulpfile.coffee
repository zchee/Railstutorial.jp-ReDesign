'use strict'

# requireDir = require('require-dir');
# requireDir('./gulp/tasks', { recurse: true });
# config = require('../config').watch;

gulp = require('gulp');
$ = require('gulp-load-plugins')();
mainBowerFiles = require('main-bower-files');
del = require('del');

config =
  app: 'app',
  dist: 'dist'


gulp.task 'watch', ->
    $.watch 'bower.json', ->
        gulp.start(['bowerInstall']);

    $.watch ["#{config.app}/scripts/{,*/}*.{coffee,litcoffee,coffee.md}"],  ->
        gulp.start(['coffee:chrome']);

    # $.watch('#{config.app}/styles/{,*/}*.{scss,sass}', function () {
    #     gulp.start(['compass']);
    # });
    # $.watch('gulpfile.js', function () {
    #     gulp.start(['copy']);
    # });
    # $.watch('#{config.app}/styles/{,*/}*.css', function () {
    #     gulp.start(['styles']);
    # });
    # $.watch(
    #   [
    #     '#{config.app}/*.html',
    #     '#{config.app}/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
    #     '#{config.app}/manifest.json',
    #     '#{config.app}/_locales/{,*/}*.json'
    #   ], function () {
    #     gulp.start(['livereload']);
    # });

# gulp.task('compass',function(){
#     gulp.src(['../stylesheets/sass/**/*.scss'])
#         .pipe($.plumber())
#         .pipe($.compass({ //コンパイルする処理
#             config_file : '../stylesheets/sass/config.rb',
#             comments : false,
#             css : '../stylesheets',
#             sass: '../stylesheets/sass/'
#         }));
# });


# Bower -------------------------------------
# gulp.task('bower', function() {
#   return gulp.src(mainBowerFiles())
#     .pipe(gulp.dest('./bower_components'))
#     .pipe($.size({
#       title: 'bower'
#     }));
# });

# gulp.task('bower:clean',
#   del.bind(null, ['./bower_components'])
# );


# Compile and Automatically Prefix ----------------
# gulp.task('style', function() {
#   return gulp.src([config.sass])
#     .pipe($.rubySass())
#     .on('error', function(err) {
#       console.error('Error', err.message);
#     })
#     .pipe(gulp.dest(config.css))
#     .pipe(reload({
#       stream: true
#     }))
#     .pipe($.size({
#       title: 'style'
#     }));
# });

# gulp.task('extension-reload', ['style'], function() {
#   run('open -g http://reload.extensions && sleep 1 && chrome-canary-cli reload').exec();
# });

# Concatenate And Minify ------------------------
# gulp.task('script', function() {
#   return gulp.src('js/**/.js')
#     .pipe(gulp.dest('dist/'))
#     .pipe($.size({
#       title: 'script'
#     }));
# });

# Edited php file after reload browsers
# gulp.task('html', function() {
#   return gulp.src('./**/*.html');
# });


gulp.task 'debug',  ->
  return gulp.start('watch');

# gulp.task('default', [''], function() {
#   gulp.watch([config.sass], ['style', 'extension-reload']);
#   gulp.watch([config.script], ['script', reload]);
#   gulp.watch([config.html], ['html', reload]);
# });
