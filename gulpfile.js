var gulp = require( "gulp" );
var ts = require( "gulp-typescript" );
var uglify = require( "gulp-uglify" );

var paths = 
{
    node : [
        "./src/**/*.ts",
        "./typings/index.d.ts"
    ]
};

var tsProject = ts.createProject( "tsconfig.json" );

gulp.task( "node", () =>
{
    return gulp.src( paths.node )
        .pipe( ts( tsProject ) )
        // .pipe( uglify() )
        .pipe( gulp.dest( "./build/" ) );
})

gulp.task( "watch", () =>
{
    gulp.watch( paths.node, [ "node" ] );
})

gulp.task( "default", [ "watch", "node" ] );