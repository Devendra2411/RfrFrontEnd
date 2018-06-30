'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var importOnce = require('node-sass-import-once');
var connect = require('gulp-connect');
var replace = require('gulp-replace');
var tslintHtmlReport = require('tslint-html-report');

gulp.task('sass', function () {
  return gulp.src('./src/style/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./src/bower_components/', './node_modules/'],
      importer: importOnce,
      importOnce: {
        index: true,
        bower: true
      },
      outputStyle: "compressed"
    }))
    .pipe(autoprefixer())
    .pipe(replace('font-awesome/fonts', 'assets/vendor'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/style'));
});

gulp.task('lint', function () {
  tslintHtmlReport(
    {
      tslint: 'tslint.json',
      srcFiles: 'src/app/**/*.ts',
      outDir: 'tslint-html-report',
      html: 'tslint-report.html',
      exclude: ['src/app/**/*.spec.ts'],
      breakOnError: false,
      typeCheck: true,
      tsconfig: 'tsconfig.json'
    }
  );

});

gulp.task('sass:watch', function () {
  gulp.watch('./src/style/**/*.scss', ['sass']);
});
