;(function( ng ) {

	ng.module("Playlitics.DOM")

		.directive( "permalink", function( $parse, Permalink) {

			return {
				restrict: "A",

				link: function(scope, el, attr) {

					// Getter for permalink source
					var derivation = $parse(attr.permalink);

					/**
					 * #updatePermalink();
					 * Update href with new derived permalink
					 */
					function updatePermalink () {
						var route = Permalink.create(derivation(scope));
						el.attr('href', route);
					}

					// When the permalink source changes update the permalink
					scope.$watch(attr.permalink, updatePermalink);
				}
			}

		});
	
}).call( this, angular );