const gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require('gulp-uglify-es').default,
  concat = require("gulp-concat"),
  rename = require("gulp-rename");
  browserSync = require("browser-sync").create();

const sharedPaths = {
  styles: {
    input: "./shared/scss/main.scss",
    output: "./shared/"
  },
  scripts: {
    input: [
      "./shared/libs/*.js",
    ],
    output: "./shared/"
  }
};

function style() {
  return gulp
    .src(sharedPaths.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sharedPaths.styles.output))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(sharedPaths.scripts.input)
    .pipe(sourcemaps.init())
    // .pipe(uglify().on('error', console.error))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sharedPaths.scripts.output))
    .pipe(browserSync.stream());
}

// Add browsersync initialization at the start of the watch task
function watch() {
  browserSync.init({
    server: "./"
  });
  // Don't rebuild the whole thign each time, just refresh so
  // the little sketch .js reload.

  gulp.watch("./sketches/**/*.js").on("change", browserSync.reload);
  gulp.watch("./sketches/**/*.css").on("change", browserSync.reload);
}


var build = gulp.series(watch, gulp.parallel(style, scripts));

gulp.task('default', build);
gulp.task('scripts', scripts);