/* jshint node: true */

(function () {
  'use strict';

  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var rimraf = require("gulp-rimraf");
  var concat = require("gulp-concat");
  var bump = require("gulp-bump");
  var html2string = require("gulp-html2string");
  var jshint = require("gulp-jshint");
  var minifyCSS = require("gulp-minify-css");
  var uglify = require("gulp-uglify");
  var runSequence = require("run-sequence");
  var path = require("path");
  var rename = require("gulp-rename");
  var factory = require("widget-tester").gulpTaskFactory;

  var jsFiles = [
    "src/**/*.js",
    "test/**/*.js",
    "!./src/components/**/*"
  ];

  gulp.task("clean-dist", function () {
    return gulp.src("dist", {read: false})
      .pipe(rimraf());
  });

  gulp.task("clean-tmp", function () {
    return gulp.src("tmp", {read: false})
      .pipe(rimraf());
  });

  gulp.task("clean", ["clean-dist", "clean-tmp"]);

  gulp.task("config", function() {
    var env = process.env.NODE_ENV || "dev";
    gutil.log("Environment is", env);

    return gulp.src(["./src/config/" + env + ".js"])
      .pipe(rename("config.js"))
      .pipe(gulp.dest("./src/config"));
  });

  gulp.task("bump", function(){
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task("lint", function() {
    return gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"));
    // .pipe(jshint.reporter("fail"));
  });

  gulp.task("sass", function () {
    return gulp.src("src/sass/main.scss")
      .pipe(sass())
      .pipe(gulp.dest("tmp/css"));
  });

  gulp.task("css", ["sass"], function () {
    return gulp.src("tmp/css/main.css")
      .pipe(rename("google-spreadsheet-controls.css"))
      .pipe(gulp.dest("dist/css"));
  });

  gulp.task("css-min", ["css"], function () {
    return gulp.src("dist/css/google-spreadsheet-controls.css")
      .pipe(minifyCSS({keepBreaks:true}))
      .pipe(rename(function (path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest("dist/css"));
  });

  gulp.task("html2js", function () {
    return gulp.src("src/html/*.html")
      .pipe(html2string({ createObj: true, base: path.join(__dirname, "src/html"), objName: "TEMPLATES" }))
      .pipe(rename({extname: ".js"}))
      .pipe(gulp.dest("tmp/templates/"));
  });

  gulp.task("angular", ["html2js", "lint"], function () {
    return gulp.src([
      "src/config/config.js",
      "tmp/templates/*.js", //template js files
      "src/angular/*.js"])

      .pipe(concat("google-spreadsheet-controls.js"))
      .pipe(gulp.dest("dist/js/angular"));
  });

  gulp.task("js-uglify", ["angular"], function () {
    gulp.src("dist/js/**/*.js")
      .pipe(uglify())
      .pipe(rename(function (path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest("dist/js"));
  });

  gulp.task("build", function (cb) {
    runSequence(["clean", "config"], ["js-uglify"/*, "css-min"*/], cb);
  });

  //TODO: Testing tasks are a work in progress

  gulp.task("webdriver_update", factory.webdriveUpdate());
  gulp.task("e2e:server-close", factory.testServerClose());
  gulp.task("e2e:server", factory.testServer());

  gulp.task("test", function(cb) {
    runSequence("build", "e2e:server", "e2e:server-close", cb);
  });

  gulp.task("default", function(cb) {
    runSequence("test", "build", cb);
  });

})();
