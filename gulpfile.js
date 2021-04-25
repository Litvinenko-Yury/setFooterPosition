"use strict";

// Пакеты, использующиеся при обработке
const gulp = require("gulp");
const autoprefixer = require('autoprefixer'); // ставит префиксы
const browserSync = require("browser-sync").create(); //локальный сервер, автообновление страницы
const del = require("del"); // библиотека для удаления файлов/папок
const csso = require("gulp-csso"); // минификация css
const plumber = require("gulp-plumber"); // формирует вывод об ошибке. Но при этом работа Gulp не прерывается.
const postcss = require('gulp-postcss'); //плагин для преобразования итогового css-код, подключает другие плагины для работы. Как и posthtml.
const rename = require("gulp-rename"); // переименовывает файлы
const uglify = require('gulp-uglify-es').default;
const ghPages = require('gh-pages'); // публикация файлов на gh-pages
const path = require('path'); // его использует 'gh-pages'

//удаляем папку build.
gulp.task("cleanFolderBuild", function () {
  return del("build");
});

//копируем папки из папки source в папку build.
gulp.task("copyFolderBuild", function () {
  return gulp.src([
    "source/img/**",
    "source/js/**",
    //"source/mt/**",
    "!source/img/*.psd", // .psd не копировать
    "!source/img/rastr/Background-*.jpg", //Background-*.jpg не копировать
    "!source/img/rastr/background-*.jpg", //background-*.jpg не копировать
    "!source/js/README" // не копировать
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

//копируем html-файлы в build
gulp.task("copy_html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});


//переименовать html-файл в php-файл
//gulp.task("rename_php", function () {
//  return gulp.src("source/index.html")
//    .pipe(rename("index.php"))
//    .pipe(gulp.dest("build"));
//});*/

//минификация css-файлов
gulp.task("minify_css", function () {
  return gulp.src("source/css/style.css")
    .pipe(plumber())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

//копирование папки fonts
// gulp.task("copy_fonts", function () {
//   return gulp.src("source/css/fonts/*")
//     .pipe(gulp.dest("build/css/fonts"));
// });

//минификация js-файлов
gulp.task("minify_js", function () {
  //return gulp.src("source/js/ajax.js")
  return gulp.src("source/js/main.js")
    .pipe(gulp.dest("build/js"))
    .pipe(rename(function (path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

//локальный сервер browser-sync.
gulp.task("server", function () {
  browserSync.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  //используем browser-sync для перезапуска страницы
  gulp.task("refresh", function (done) {
    browserSync.reload();
    done();
  });

  //----------------------------------------------------------------
  gulp.watch("source/*.html", gulp.series("copy_html", "refresh"));
  gulp.watch("source/**/*.css", gulp.series("minify_css", "refresh"));
  gulp.watch("source/js/main.js", gulp.series("minify_js", "refresh"));
});

//----------------------------------------------------------------
gulp.task("build", gulp.series(
  "cleanFolderBuild",
  "copyFolderBuild",
  "copy_html",
  "minify_css",
  /*"copy_fonts",*/
  "minify_js"
));

gulp.task("start", gulp.series("build", "server"));

//----------------------------------------------------------------
//задача публикации на gh-pages
function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './build'), cb);
}
exports.deploy = deploy;
