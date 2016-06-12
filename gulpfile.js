var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var uglifyJS = require("gulp-uglify");
var concat = require("gulp-concat");
var es = require("event-stream");

var paths = {
	node: [
		"./src/ts/**/*.ts",
		"./typings/tsd.d.ts"
	],
	package: "./src/package.json",
	build: "./dist",
	venderInJS: "./src/www/js/**/*.js",
	venderInTS: "./src/www/ts/**/*.ts",
	vendorOut: "./dist/www/js",
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

gulp.task("vendor.js", () => {
	return es.merge(
		gulp.src(paths.venderInJS),
		
		gulp.src(paths.venderInTS)
		.pipe(ts({target:"ES5"}))
	)
	.pipe(concat("vendor.js"))
	.pipe(uglifyJS())
	.pipe(gulp.dest(paths.vendorOut));
})

gulp.task("watch", () => {
	gulp.watch(paths.node, ["typescript"]);
	gulp.watch(paths.venderInJS, ["vendor.js"]);
});

gulp.task("default", ["watch", "typescript", "vendor.js"]);