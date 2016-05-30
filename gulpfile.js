var gulp = require("gulp");
var ts = require("gulp-typescript");

var paths = {
    node: [
        "./src/**/*.ts",
        "./typings/index.d.ts"
    ],
    package: "./src/package.json",
    build: "./build"
};

var tsProject = ts.createProject("tsconfig.json");

gulp.task("node", () => {
    return gulp.src(paths.node)
        .pipe(ts(tsProject))
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