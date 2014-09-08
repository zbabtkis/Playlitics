/**
 * trackList
 * A directive for listing songs
 * 
 * @package Playlitics.DOM
 * @class   Directive
 */
;(function( ng ) {

	"use strict";

	ng.module("Playlitics.DOM")
		
		.directive( "trackList", function( $parse, $rootScope ) {
			return {
				restrict: 'EA',
				
				templateUrl: 'views/tracklist.html',

				link: function( scope, el, attr ) {
					var trackSelectCallback = $parse(attr['onTrackSelect'])(scope);

					scope.trackSelect = function( track ) {
						$rootScope.$broadcast("trackSelected", track);
						trackSelectCallback( track );
					};
				}
			};
		});

}).call( this, angular );
