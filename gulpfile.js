/* jshint node: true */

(function () {
  "use strict";

  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var rimraf = require("gulp-rimraf");
  var concat = require("gulp-concat");
  var bump = require("gulp-bump");
  var html2js = require("gulp-html2js");
  var jshint = require("gulp-jshint");
  var sass = require("gulp-sass");
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

  gulp.task("angular:html2js", function() {
    return gulp.src("src/angular/*.html")
      .pipe(html2js({
        outputModuleName: "risevision.widget.common.google-spreadsheet-controls",
        useStrict: true,
        base: "src/angular"
      }))
      .pipe(rename({extname: ".js"}))
      .pipe(gulp.dest("tmp/ng-templates"));
  });

  gulp.task("angular", ["angular:html2js", "lint"], function () {
    return gulp.src([
      "src/config/config.js",
      "tmp/ng-templates/*.js",
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

  gulp.task("e2e:server-close", factory.testServerClose());
  gulp.task("e2e:server", factory.testServer());
  gulp.task("webdriver_update", factory.webdriveUpdate());
  gulp.task("test:ensure-directory", factory.ensureReportDirectory());

  gulp.task("test:e2e:ng:core", factory.testE2EAngular({
    testFiles: "./test/e2e/spreadsheet-controls-test.js"
  }));

  gulp.task("test:metrics", factory.metrics());

  gulp.task("test:e2e:ng", ["test:ensure-directory", "webdriver_update"], function (cb) {
    return runSequence("e2e:server", "test:e2e:ng:core",
      function (err) {
        gulp.run("e2e:server-close");
        cb(err);
      });
  });

  gulp.task("test", ["build"], function (cb) {
    return runSequence("test:e2e:ng", "test:metrics", cb);
  });

  gulp.task("default", ["build"]);

})();
