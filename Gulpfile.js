var gulp = require('gulp')
  , connect = require('gulp-connect')
  , ngmin   = require('gulp-ngmin')
  , concat  = require('gulp-concat')
  , rename  = require('gulp-rename')
  , cssmin  = require('gulp-cssmin')
  , uglify  = require('gulp-uglifyjs');

gulp.task('serve', function() {

	// Run http server in app root
	connect.server();

});

gulp.task('concat', function() {
	gulp.src([
		'src/services/playlitics.data.js',
		'src/services/playlitics.data.permalink.js',
		'src/services/playlitics.data.spotify.js',
		'src/services/playlitics.data.store.js',
		'src/filters/playlitics.filters.js',
		'src/filters/playlitics.filters.percent.js',
		'src/filters/playlitics.filters.duration.js',
		'src/directives/playlitics.dom.js',
		'src/directives/playlitics.dom.spotifysearch.js',
		'src/directives/playlitics.dom.tracklist.js',
		'src/app.js',
		'src/controllers/playlitics.playlist.ctrl.js',
		'src/controllers/playlitics.playlists.ctrl.js',
		'src/controllers/playlitics.spotifysearch.ctrl.js'
		])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'));

	gulp.src([
		'components/jquery/dist/jquery.min.js',
		'components/angular/angular.min.js',
		'components/angular-ui-router/release/angular-ui-router.min.js',
		'components/hammerjs/hammer.min.js',
		'components/angular-hammer/angular-hammer.js',
		'components/ngRepeatReorder/dist/ngRepeatReorder.js',
		'components/foundation/js/foundation.min.js'
		])
		.pipe(concat('dependencies.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
	gulp.src('dist/all.js')
		.pipe(ngmin())
		.pipe(uglify('all.min.js', {
			mangle: false
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('cssmin', function() {
	gulp.src([
		'components/foundation/css/normalize.css',
		'components/foundation/css/foundation.css',
		'components/font-awesome/css/font-awesome.min.css'
		])
		.pipe(concat('dependencies.css'))
		.pipe(cssmin())
		.pipe(rename('dependencies.min.css'))
		.pipe(gulp.dest('dist'));

	gulp.src('css/app.css')
		.pipe(cssmin())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('dist'));
})

gulp.task('default', ['concat', 'uglify', 'cssmin']);