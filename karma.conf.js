module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			'components/angular/angular.js',
			'components/angular-mocks/angular-mocks.js',
			'components/angular-ui-router/release/angular-ui-router.js',
			'components/jquery/dist/jquery.min.js',
			'components/hammerjs/hammer.js',
			'components/angular-hammer/angular-hammer.js',
			'components/ngRepeatReorder/dist/ngRepeatReorder.js',

			'src/filters/playlitics.filters.js',
			'src/filters/playlitics.filters.duration.js',
			'src/filters/playlitics.filters.percent.js',

			'src/services/*.js',
			'src/directives/*.js',

			'src/app.js',
			'src/controllers/*.js',
			'test/unit/*.js',
			'views/*.html'
		],
		reporters: ['mocha'],
		preprocessors: {
			'views/*.html': ['ng-html2js']
		},
		ngHtml2JsPreprocessor: {
			moduleName: 'template.html'
		}
	});
};
