var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");

var paths = {
    node: [
        "./src/**/*.ts",
        "./typings/index.d.ts"
    ],
    package: "./src/package.json",
    build: "./build",
    sourcemaps : "sourcemaps"
};

var tsProject = ts.createProject("tsconfig.json");

gulp.task("node", () => {
    var tsResult = gulp.src(paths.node)
        .pipe(sourcemaps.init())
        .pipe(ts("./tsconfig.json"))
 
        // tsResult.dts
        //     .pipe(gulp.dest(paths.build))
 
        return tsResult.js
        .pipe(sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.build));
});

gulp.task("package.json", () => {
    return gulp.src(paths.package)
        .pipe(gulp.dest(paths.build));
});

gulp.task("watch", () => {
    gulp.watch(paths.node, ["node"]);
    gulp.watch(paths.package, ["package.json"]);
});

gulp.task("default", ["watch", "node", "package.json"]);