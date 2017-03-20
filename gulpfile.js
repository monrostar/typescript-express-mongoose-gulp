let gulp            = require("gulp"),
    ts              = require("gulp-typescript"),
    nodemon         = require('gulp-nodemon'),
    tslint          = require("gulp-tslint"),
    livereload      = require('gulp-livereload')
  ;

//www
gulp.task('default', ['www']);
gulp.task('www', ['serve'], function () {

});

gulp.task('serve', ['watch', 'json-assets'], function () {
  nodemon({
    script: './dist/server/server',
    ext   : 'js',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('build-dist', ['ts-lint'], () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
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

gulp.task('watch', ['build-dist'], () => {
  gulp.watch('server/**/*.ts', ['build-dist']);
  gulp.watch('server/**/*.json', ['json-assets']);
});

gulp.task('json-assets', function() {
  return gulp.src('server/**/*.json')
    .pipe(gulp.dest('dist/server'));
});

//Testing
gulp.task('test', ["run-tests", "test-watch"]);

gulp.task('run-tests', ['build-dist'], function () {
  return gulp
    .src(['./dist/test/*.js'])
    .pipe(mocha());
});

gulp.task('test-watch', function () {
  gulp.watch(['server/**/*.ts', 'test/**/*.ts'], ['run-tests']);
});