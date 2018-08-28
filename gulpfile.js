const gulp = require('gulp'),
			jshint = require('gulp-jshint'),
			uglify = require('gulp-uglify'),
			rename = require('gulp-rename'),
			concat = require('gulp-concat'),
			notify = require('gulp-notify'),
			livereload = require('gulp-livereload'),
			clean = require('gulp-clean'),
			connect = require('gulp-connect');

gulp.task('minify-js', function () {
	return gulp.src('src/tiny-swiper.js')
				.pipe(jshint())
				.pipe(jshint.reporter('default'))
				.pipe(concat('tiny-swiper.js'))
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(uglify())
				.pipe(gulp.dest('dist/'))
				.pipe(connect.reload())
				.pipe(notify({
					message: 'Gulp bundle is running...'
				}));
});

gulp.task('webServer', function () {
	connect.server({
		port: 8080,
		livereload: true,
	});
});

gulp.task('clean', function (cb){
	return gulp.src(['dist/'])
				.pipe(clean());
});

gulp.task('default', ['clean'], function () {
	gulp.start('minify-js');
});

gulp.task('watch', function () {
	gulp.start('webServer');
	gulp.watch('src/*.js', ['minify-js']);
	livereload.listen();
	gulp.watch(['dist/**']).on('change', livereload.changed);
});