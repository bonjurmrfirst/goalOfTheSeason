const gulp = require('gulp'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('pre-build', function() {
  del(['./build/**/*.*', '!./build/index.html']);

  gulp.src(['development/**/*.*', '!development/index.html'])
    .pipe(gulp.dest('build'));

  gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/sweetalert/dist/sweetalert.min.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

gulp.task('build', function() {
  gulp.src('build/assets/css/*.css')
    .pipe(autoprefixer({
      browsers: ['>0.01%'],
      cascade: false
    }))
    .pipe(gulp.dest('build/assets/css'));
});