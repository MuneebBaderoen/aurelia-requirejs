var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var less = require('gulp-less')

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
  return gulp.src([paths.source, '!src/lib/**/*.js'])
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules:'amd'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-css', function () {
  return gulp.src(paths.css)
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-less', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('copy-libs', function () {
  return gulp.src(paths.libs)
    .pipe(gulp.dest(paths.output + '/lib'));
});

gulp.task('copy-fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-css', 'build-less', 'copy-libs', 'copy-fonts'],
    callback
  );
});
