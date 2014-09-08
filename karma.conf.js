module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			'components/angular/angular.js',
			'components/angular-mocks/angular-mocks.js',
			'components/angular-ui-router/release/angular-ui-router.js',
			'src/**',
			'test/unit/spec.js',
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
