module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
		files: [
			'test/unit/spec.js',
			'index.html'
		]
  });
};
