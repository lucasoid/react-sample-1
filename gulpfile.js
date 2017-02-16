/*jslint node: true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js:transpile', function () {
    return gulp.src('./src/js/**/*.jsx')
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('js:build', ['js:transpile'], function () {
    return gulp.src('./build/js/index.js')
        .pipe(webpack({output: {filename: 'bundle.js'}}))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('build', ['sass', 'js:build']);