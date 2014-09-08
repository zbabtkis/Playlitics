/**
 * Directive unit tests
 * 
 * @package Playlitics.DOM
 */

describe("Playlitics.DOM.spotifySearch", function() {

	beforeEach(function () {

		angular.module("Mocks", [])
			.service('Spotify', function( $q ) {
				this.search = function() {
					return $q.defer().promise;
				};
			});

		angular.module("Test", ["Playlitics", "Playlitics.DOM", "Mocks"]);

		module("Test");
		module("template.html")
	});

	beforeEach(inject(function($rootScope, $compile, Spotify) {
		this.scope    = $rootScope;
		this.$compile = $compile;
	}));

	afterEach(function() {
		delete this.$rootScope;
		delete this.$compile;
	});

	describe("when typing", function() {
		it("should trigger refresh of matched songs", inject(function(Spotify) {
			var scope = this.scope, el;

			el = this.$compile('<spotify-search></spotify-search>')(scope);

			scope.$apply();

			spyOn(scope, 'runSearch');

			scope.$apply(function() {
				scope.sq = "Sitting, Waiting, Wishing";
			});

			expect(scope.runSearch).toHaveBeenCalled();

		}));

		// Should only happen when directive is firat instantiated
		describe("a null or undefined query", function() {
			var scope, el;

			beforeEach(function() {
				scope = this.scope;
				el    = this.$compile('<spotify-search></spotify-search>')(scope);

				scope.$apply();
			})

			it("should return empty array from onSearchChange", function() {

				// Assert
				expect(scope.onSearchChange()).toEqual([]);

			});

			it("should not call runSearch", function() {

				// Setup
				spyOn(scope, 'runSearch');

				// Act
				scope.onSearchChange();

				// Assert
				expect(scope.runSearch).not.toHaveBeenCalled();

			});
		});

		describe("an empty string", function() {
			var scope, el;

			beforeEach(function() {
				scope = this.scope;

				el = this.$compile('<spotify-search></spotify-search>')(scope);

				scope.$apply();

				scope.$apply(function() {
					scope.sq = "Sitting, Waiting, Wishing";

					// Let's pretend that resolved an array of... numbers.
					scope.tracks = [1, 2, 3];
				});

				spyOn(scope, 'runSearch');

				scope.$apply(function() {
					scope.sq = "";
				});

			});

			it("doesn't call spotofy API", function() {

				expect(scope.runSearch).not.toHaveBeenCalled();

			});

			it("empties existing track list", function() {

				expect(scope.tracks.length).toEqual(0);

			});

		});

	});

});