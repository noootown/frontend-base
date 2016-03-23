var gulp = require('gulp');
var browserSync=require('browser-sync');
var compass=require('gulp-compass');
var gulpJade=require('gulp-jade');
var gulpif=require('gulp-if');
var sprity=require('sprity');
require('sprity-sass');


gulp.task('watch',['styles'] ,function () {
    gulp.watch(['src/js/*.js'], ['js',browserSync.reload]);
    gulp.watch(['src/sass/*.sass'], ['styles',browserSync.reload]);
    gulp.watch(['src/jade/*.jade'], ['views',browserSync.reload]);
    gulp.watch(['dest/images/**/*.{png,jpg}'], ['sprite']);
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './dest' 
        }
    });
});

gulp.task('js', function(){
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dest/js'));
});

gulp.task('styles', function () {
    gulp.src('src/sass/*.sass')
    .pipe(compass({
        css: 'dest/css',
        sass: 'src/sass',
        image: 'dest/images'
    }))
    .pipe(gulp.dest('dest/css'));
});

gulp.task('sprite', function () {
    sprity.src({
        src: 'dest/images/icon/*.{png,jpg}',
        style: 'src/sass/_icon.sass',
        'style-type': 'sass',
        processor: 'sass', // make sure you have installed sprity-sass 
        'style-indent-size': 4
    })
    .pipe(gulpif('*.png', gulp.dest('dest/images'), gulp.dest('src/sass')));
});

gulp.task('views', function () {
    gulp.src('src/jade/*.jade')
    .pipe(gulpJade()) 
    .pipe(gulp.dest('dest'));
});


gulp.task('default',['server','watch']);
