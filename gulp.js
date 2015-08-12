var gulp = require('gulp');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');

console.log("!!!!!!!!!!!!!!!!!!!!`");
gulp.task('default', function () {
console.log("~~~~~~~~~~~~~~~~~~~~~~~`");
    return gulp.src('./server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client/js/services'));
    console.log("````````````````");
});