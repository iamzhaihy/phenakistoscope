const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');

gulp.task('copyHTML', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('minifyJS', () => {
    gulp.src("src/js/*.js")
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
}); 

gulp.task('minifyCSS', () => {
    gulp.src('src/css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('run', ['copyHTML', 'minifyJS', 'minifyCSS']);

gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['minifyJS']);
    gulp.watch('src/css/*.css', ['minifyCSS']);
})

gulp.task('default', ['run', 'watch']);
