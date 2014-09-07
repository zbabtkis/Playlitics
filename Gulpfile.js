var gulp = require('gulp')
  , connect = require('gulp-connect')
  , uglify  = require('gulp-uglify');

gulp.task('serve', function() {

	// Run http server in app root
	connect.server();

});
