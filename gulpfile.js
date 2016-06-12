var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var uglifyJS = require("gulp-uglify");
var concat = require("gulp-concat");

var paths = {
	node: [
		"./src/ts/**/*.ts",
		"./typings/tsd.d.ts"
	],
	package: "./src/package.json",
	build: "./dist",
	venderIn: "./src/www/js/**/*.js",
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
	return gulp.src(paths.venderIn)
		.pipe(concat("vendor.js"))
		.pipe(uglifyJS())
		.pipe(gulp.dest(paths.vendorOut));
})

gulp.task("watch", () => {
	gulp.watch(paths.node, ["typescript"]);
	gulp.watch(paths.venderIn, ["vendor.js"]);
});

gulp.task("default", ["watch", "typescript", "vendor.js"]);