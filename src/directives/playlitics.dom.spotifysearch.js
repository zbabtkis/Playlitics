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

		.directive("spotifySearch", function ( ) {

			return {

				// tagNames are hardcore and thus cool
				restrict: "E",

				// Allow child elements to exist and inherit
				// search results
				transclude: true,

				// Load template over HTTP... Prettier that way.
				templateUrl: "views/spotifysearch.html",

				// Create controller with shared scope for track list
				controller: function($scope, Spotify) {

					// Holds tracks returned from Spotify search query
					$scope.tracks = [];	

					/**
					 * #runSearch( q );
					 * Query's spotify service for tracks
					 * 
					 * @param { String } - q - user's search text
					 */
					$scope.runSearch = function ( q ) {

						// Query spotify service for given song name
						Spotify.search( q )
							.then( function( response ) {

								// Remove existing error if any
								// @TODO use error reporting service
								delete $scope.error;

								// Set data on scope
								$scope.tracks = response.data.tracks;
							})
							.catch( function( error ) {

								console.debug( error );

								// @TODO add error reporting here
								// notify error
								$scope.error = error;
							});
					};
				},

				// build functionality around each spotify-search widget
				link: function( scope, el, attr ) {

					/**
					 * #onSearcgChange()
					 * Runs whenever the user's search text changes
					 */
					scope.onSearchChange = function ( ) {

						// Get the current value of the input
						var q = scope.sq;

						// If query string is empty, empty song list 
						// and don't run query
						if ( !q ) {
							return scope.tracks = [];
						}

						// If valid search, send Spotify API call
						scope.runSearch ( q );

					};

					// when search changes, update songs list
					scope.$watch('sq', scope.onSearchChange);
						
				}

			};
			
		})

}).call( this, angular );
