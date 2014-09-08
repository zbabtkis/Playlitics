/**
 * SpotifySearchCtrl
 * Provides tracks array and method fo querying spotify
 * throuh the Spotify service
 *
 * @package Playlitics
 * @class   Controller
 */
;(function( ng ) {
	
	"use strict";

	ng.module("Playlitics")

		.controller("SpotifySearchCtrl", function($scope, Spotify) {

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
			
		});
	
}).call( this, angular );
