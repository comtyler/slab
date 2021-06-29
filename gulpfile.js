'use strict';

// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");

//Require global Gulp plugins
const plumber = require('gulp-plumber'),
			livereload = require('gulp-livereload'),
			sourcemaps = require('gulp-sourcemaps'),
			environments = require('gulp-environments'),
			postcss = require('gulp-postcss'),
			purgecss = require ('gulp-purgecss'),
			cleancss = require ('gulp-clean-css'),
			sass = require('gulp-sass')(require('sass')),
			terser = require('gulp-terser'),
			concat = require('gulp-concat');

//Set environment variables
var development = environments.development,
		production = environments.production;

//Compile the styles
function styles() {
	return gulp.src(pkg.paths.styles.input)
		.pipe(plumber())
		.pipe(development(sourcemaps.init()))
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: development() ? 'expanded' : 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(postcss())
    .pipe(production(purgecss({ content: pkg.paths.files })))
    .pipe(production(cleancss({ level: 2 })))
		.pipe(development(sourcemaps.write()))
		.pipe(development(livereload()))
		.pipe(gulp.dest(pkg.paths.styles.output))
}

//Compile the scripts
function scripts() {
	return gulp.src(pkg.paths.scripts.input)
		.pipe(plumber())
		.pipe(development(sourcemaps.init()))
		.pipe(concat('application.js'))
		.pipe(production(terser()))
		.pipe(development(sourcemaps.write()))
		.pipe(development(livereload()))
		.pipe(gulp.dest(pkg.paths.scripts.output))
}

//Set which files to watch during development
function watch() {
	livereload.listen(35729);

	gulp.watch(pkg.paths.files).on('change', function(file) {
		livereload.changed(file);
	});
	
	gulp.watch(pkg.paths.styles.input, styles);
	gulp.watch(pkg.paths.scripts.input, scripts);
}

//Define our tasks
gulp.task('build', gulp.parallel(styles, scripts));
gulp.task('default', gulp.parallel(styles, scripts, watch));