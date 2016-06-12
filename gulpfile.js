var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");

var paths = {
	node: [
		"./src/ts/**/*.ts",
		"./typings/tsd.d.ts"
	],
	package: "./src/package.json",
	build: "./dist",
	sourcemaps : "sourcemaps"
};

var tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript", () => {
	var tsResult = gulp.src(paths.node)
		.pipe(sourcemaps.init())
		.pipe(ts("./tsconfig.json"))
 
		tsResult.dts
			.pipe(gulp.dest(paths.build))
 
		return tsResult.js
		.pipe(sourcemaps.write(paths.sourcemaps))
		.pipe(gulp.dest(paths.build));
});

gulp.task("watch", () => {
	gulp.watch(paths.node, ["typescript"]);
});

gulp.task("default", ["watch", "typescript"]);