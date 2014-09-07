/**
 * SpotifySearch
 *  - Spotify search widget for querying Spotify service
 *
 * @package Playlitics.DOM
 * @class 	Service
 */
;(function( ng ) {

	"use strict";

	ng.module("Playlitics.DOM")

		.directive("spotifySearch", function ( Spotify ) {

			return {

				// tagNames are hardcore and thus cool
				restrict: "E",

				// Allow child elements to exist and inherit
				// search results
				transclude: true,

				template: "<section class='search'><input type='text' placeholder='Enter song name' /></section><div ng-transclude></div>",

				// Create controller with shared scope for track list
				controller: function($scope) {
					$scope.tracks = [];	
				},

				// build functionality around each spotify-search widget
				link: function( scope, el, attr ) {

					scope.querySpotifySongs = function( e ) {

						// Get the current value of the input
						var q = e.currentTarget.value;

						// If query string is empty, empty song list 
						// and don't run query
						if ( q === "" ) {
							return scope.songList = [];
						}

						// Query spotify service for given song name
						Spotify.search( q )
							.then( function( response ) {

								// Remove existing error if any
								// @TODO use error reporting service
								delete scope.error;

								// Set data on scope
								scope.tracks = response.data.tracks;
								console.log(scope.tracks);
							})
							.catch( function( error ) {

								console.debug( error );

								// @TODO add error reporting here
								// notify error
								scope.error = error;
							});
					}

					// when value of input changes, update songs list
					el.find('input')
						.bind('change', scope.querySpotifySongs);
						
				}

			};
			
		})

}).call( this, angular );
