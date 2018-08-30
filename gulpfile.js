const gulp = require('gulp'),
			jshint = require('gulp-jshint'),
			uglify = require('gulp-uglify'),
			rename = require('gulp-rename'),
			concat = require('gulp-concat'),
			notify = require('gulp-notify'),
			livereload = require('gulp-livereload'),
			clean = require('gulp-clean'),
			sass = require('gulp-sass'),
			prefixer = require('gulp-autoprefixer'),
			minify = require('gulp-minify-css')
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
					message: 'Tiny Swiper is being packed...'
				}));
});

gulp.task('minify-css', function () {
	return gulp.src('demo/scss/*.scss')
						.pipe(sass())
						// .pipe(prefixer('last 2 versions'))
						.pipe(minify())
						.pipe(concat('styles.css'))
						.pipe(rename({
							basename: 'styles',
							suffix: '.min'
						}))
						.pipe(gulp.dest('demo/css'))
						.pipe(connect.reload())
						.pipe(notify({
							message: 'Scss is being packed...'
						}));
});

gulp.task('webServer', function () {
	connect.server({
		port: 8080,
		livereload: true,
	});
});

gulp.task('clean', function (){
	return gulp.src(['dist/', 'demo/css/'])
				.pipe(clean());
});

gulp.task('default', ['clean'], function () {
	gulp.start(['minify-js', 'minify-css']);
});

gulp.task('watch', function () {
	gulp.start('webServer');
	gulp.watch('src/*.js', ['minify-js']);
	gulp.watch('demo/scss/*.scss', ['minify-css']);
	livereload.listen();
	gulp.watch(['dist/**', 'demo/css/**']).on('change', livereload.changed);
});