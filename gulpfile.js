var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var run_sequence = require('run-sequence');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('clean', function(done) {
  return del(['./build'], done);
});

gulp.task('markup', function() {
  gulp.src('./src/*.html')
      .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function() {
    return gulp.src('src/script/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function () {
  return gulp.src('./src/styles/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('./build/css/'));
});

gulp.task('build', function(done) {
  run_sequence('clean', ['markup', 'scripts', 'styles'], done);
});

gulp.task('serve', ['build'], function() {
  connect.server({livereload: true, root: './build'});
  gulp.watch("./src/**/*.*", ['build']);
  watch("./build/**/*.*").pipe(connect.reload());
});

gulp.task('default', ['serve']);

