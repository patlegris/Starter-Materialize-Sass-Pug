/***************************************************************************/
/*                                                                         */
/* gulp start ->               Lancer le projet                            */
/*                                                                         */
/***************************************************************************/
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');

gulp.task('css', function () {
    return gulp.src(['./_assets/scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./_assets/css'));
});

gulp.task('html', function buildHTML() {
    return gulp.src(['./views/src/index.pug'])
        .pipe(pug(
            {
                pretty: true
            }
        ))
        .pipe(gulp.dest('./views/dist'));
});


gulp.task('watch', ['css', 'html'], function(){

    gulp.watch([
            './_assets/scss/**/*.scss',
            './_components/../_assets/scss/*.scss'
        ], ['css']).on('change', browserSync.reload);

    gulp.watch([
            './views/src/*.pug',
            './views/src/layout/*.pug',
            './_components/**/*.pug'
        ], ['html']).on('change', browserSync.reload);

});


gulp.task('start', ['watch'], function() {
  browserSync.init({
    server: {
      // baseDir: "localhost:3000/Google%20Drive/Renault/renault-intranet/views/dist/index.html"
      baseDir: "./",
      directory: true,
        stream: false
    }
  })
});