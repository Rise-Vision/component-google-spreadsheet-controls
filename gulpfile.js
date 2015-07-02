/* jshint node: true */

(function (console) {
  "use strict";

  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var concat = require("gulp-concat");
  var bump = require("gulp-bump");
  var html2js = require("gulp-html2js");
  var jshint = require("gulp-jshint");
  var uglify = require("gulp-uglify");
  var runSequence = require("run-sequence");
  var path = require("path");
  var rename = require("gulp-rename");
  var factory = require("widget-tester").gulpTaskFactory;
  var del = require("del");
  var bower = require("gulp-bower");
  var colors = require("colors");

  gulp.task("clean-dist", function (cb) {
    del(['./dist/**'], cb);
  });

  gulp.task("clean-tmp", function (cb) {
    del(['./tmp/**'], cb);
  });

  gulp.task("clean", ["clean-dist", "clean-tmp"]);

  gulp.task("clean-bower", function(cb){
    del(["./components/**"], cb);
  });

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
    return gulp.src("src/**/*.js")
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"));
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
      "src/angular/dtv-spreadsheet-controls.js",
      "tmp/ng-templates/*.js",
      "src/angular/svc-spreadsheet-controls.js"])

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

  gulp.task("test:unit:ng", factory.testUnitAngular({
    testFiles: [
      "components/q/q.js",
      "components/angular/angular.js",
      "components/angular-mocks/angular-mocks.js",
      "node_modules/widget-tester/mocks/common-mock.js",
      "node_modules/widget-tester/mocks/spreadsheet-controls-http-mock.js",
      "src/config/test.js",
      "src/angular/*.js",
      "test/unit/**/*spec.js",
      "test/unit/mock-modules/*mock.js"
    ]
  }));

  // ***** Primary Tasks ***** //
  gulp.task("bower-clean-install", ["clean-bower"], function(cb){
    return bower().on("error", function(err) {
      console.log(err);
      cb();
    });
  });

  gulp.task("test", ["build"], function (cb) {
    return runSequence("test:unit:ng", "test:e2e:ng", "test:metrics", cb);
  });

  gulp.task("build", function (cb) {
    runSequence(["clean", "config"], "js-uglify", cb);
  });

  gulp.task("default", [], function() {
    console.log("********************************************************************".yellow);
    console.log("  gulp bower-clean-install: delete and re-install bower components".yellow);
    console.log("  gulp build: build a distribution version".yellow);
    console.log("  gulp test: run e2e and unit tests".yellow);
    console.log("********************************************************************".yellow);
    return true;
  });

})(console);
