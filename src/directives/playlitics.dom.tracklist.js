;(function( ng ) {

	"use strict";

	ng.module("Playlitics.DOM")
		
		.directive( "trackList", function( $parse ) {
			return {
				restrict: 'EA',
				
				templateUrl: 'views/tracklist.html',

				link: function( scope, el, attr ) {
					var trackSelectCallback = $parse(attr['onTrackSelect'])(scope);
					el.bind('click', trackSelectCallback);
				}
			};
		});

}).call( this, angular );
