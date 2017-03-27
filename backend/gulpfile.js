let gulp       = require("gulp"),
    ts         = require("gulp-typescript"),
    nodemon    = require("gulp-nodemon"),
    tslint     = require("gulp-tslint"),
    livereload = require("gulp-livereload"),
    mocha      = require("gulp-spawn-mocha"),
    sass       = require("gulp-sass")
  ;

const filesToMove = ["public/**/*", "views/**/*", "server/**/*.json", "!public/sass/**/*", "!public/sass"];

const sassIndex = "public/sass/index.scss";

// pull in the project TypeScript config
const tsProject = ts.createProject("tsconfig.json");


//dev server build and start --watch
gulp.task("default", ["serve"]);

gulp.task("serve", ["watch", "move-files", "compile-sass", "build-dist"], function () {
  nodemon({
    script: "./dist/server/server",
    ext   : "js",
  }).on("restart", function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

gulp.task("build-serve", ["build-dist", "ts-lint", "move-files", "compile-sass"]);

gulp.task("build-dist", ["ts-lint"], () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("ts-lint", function () {
  return tsProject.src()
    .pipe(tslint({
      formatter: "prose"
    }))
    .pipe(tslint.report({
      summarizeFailureOutput: false
    }));
});

gulp.task("watch", () => {
  gulp.watch("server/**/*.ts", ["build-dist"]);
  gulp.watch(filesToMove, ["move-files"]);
  gulp.watch(sassIndex, ["compile-sass"]);
});

gulp.task("move-files", function () {
  return gulp.src(filesToMove, { base: "." })
    .pipe(gulp.dest("dist"));
});

// Sass compile

gulp.task("compile-sass", function () {
  return gulp.src(sassIndex)
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(gulp.dest("dist/public/css/"));
});

//Testing
gulp.task("test", ["run-tests", "test-watch"]);

gulp.task("run-tests", ["build-dist"], function () {
  return gulp
    .src(["./dist/test/*.js"])
    .pipe(mocha());
});

gulp.task("test-watch", function () {
  gulp.watch(["server/**/*.ts", "test/**/*.ts"], ["run-tests"]);
});
