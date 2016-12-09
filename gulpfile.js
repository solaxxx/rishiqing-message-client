/**
 * Created by solax on 2016-12-5.
 */

var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var eslint     = require('gulp-eslint');
var uglify     = require('gulp-uglify');
var watch      = require('gulp-watch');
var buffer     = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var bom        = require('gulp-bom');
// eslint code check
gulp.task('eslint', function () {
  return gulp.src(['src/*.js'  , '!node_modules/**' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// browser support
gulp.task('browserify', function () {
  return  browserify('./src/index.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

// gulp watch
gulp.task('watch', function () {
  var watcher = gulp.watch('./src/*.js', ['browserify']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
})