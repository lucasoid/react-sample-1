/*jslint node: true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackStream = require('gulp-webpack');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/index.jsx')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('build', ['sass', 'js']);