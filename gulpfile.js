const gulp = require('gulp');
const terser = require('gulp-terser');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));



// Process Scripts
function scripts() {
    return gulp.src(['src/js/*.js', '!src/js/*.min.js']) // Exclude already minified files
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
}

// Process Styles
function styles() {
    return gulp.src('src/scss/*.scss') // Your custom SCSS files
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
        .pipe(cssnano()) // Minify CSS
        .pipe(rename({ extname: '.min.css' })) // Rename to .min.css
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}

function html() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}

// Watch files
function watchFiles() {
    gulp.watch('src/scss/*.scss', styles);
    gulp.watch('src/js/*.js', scripts);
    gulp.watch('src/*.html', html);
}

// Define complex tasks
const build = gulp.parallel(styles, scripts, html);
const watch = gulp.series(build, watchFiles);

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.watch = watch;
exports.build = build;
exports.default = build;