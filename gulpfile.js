var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    htmlmin = require('gulp-htmlmin'),
    gls = require('gulp-live-server');

// gulp.task('default',['sass','js','htmlmin','image','watch','serve']);
gulp.task('default',['sass','image','watch','serve']);

gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe(concat('style.min.css'))
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('image', function() {
    return gulp.src('assets/src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/img'));
});



gulp.task('watch', function() {
    gulp.watch('assets/src/sass/**/*.scss',['sass']);
    gulp.watch('assets/src/img/*',['image']);
});

gulp.task('serve',function(){
    var server = gls.static('./',8000);
    server.start();
    gulp.watch('assets/css/**/*.css', function(file){
        gls.notify.apply(server,[file]);
    });
    gulp.watch('assets/img/*', function(file){
        gls.notify.apply(server,[file]);
    });

});