'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const del = require('del');

gulp.task('clean', function () {
	return del('dist');
});

gulp.task('pug', function () {
	return gulp.src('src/views/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('clean', 'pug'));

gulp.task('watch', function () {
	gulp.watch('src/views/**/*.*', gulp.series('pug'));
});

gulp.task('serve', function () {
	browserSync.init({
		server: 'dist'
	});

	browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));