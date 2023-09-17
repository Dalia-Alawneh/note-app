const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');


gulp.task('minify-css', function () {
    return gulp
        .src('assets/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/css'));
});


gulp.task('minify-js', function () {
    return gulp
        .src('assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});


gulp.task('default', gulp.series('minify-css', 'minify-js'));
