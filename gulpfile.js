var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sass = require("gulp-scss"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    pump = require('pump');

gulp.task('scripts', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('game.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('sass', function () {
 return gulp.src('./src/scss/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['scripts', 'sass', 'watch']);

gulp.task('watch', () => {
    gulp.watch(['./src/js/**/*.js'], ['scripts']);
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
});