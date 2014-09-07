/**
 * Playlitics.Data [ Service ] - Spotify
 * Query Spotify API
 */

;(function(ng) {

	"use strict";

	angular.module( 'Playlitics.Data' )

		.service( 'Spotify', function( $http ) {

			// Default settings for spotify query building
			var settings = {};

			// Spotify track query endpoint
			settings.API_ENDPOINT            = "http://ws.spotify.com/search/1/track.json";
			
			// JSONP window callback name
			settings.JSONP_RESPONSE_CALLBACK = "JSON_CALLBACK"

			/**
			 * #search( q )
			 * Create XHR query for matching songs in spotify library
			 *
			 * @param { String } - q search term
			 * @return { Promise } - promise of search response
			 */
			this.search = function( q ) {
				return $http.jsonp(settings.API_ENDPOINT + "?q=" + this.safeQuery(q) + "&callback=" + settings.JSONP_RESPONSE_CALLBACK);
			};

			/**
			 * #safeQuery( q );
			 * Convert regular string to URI safe string
			 * 
			 * @param { String } - q - query string
			 * @return { String } URI safe string
			 */
			this.safeQuery = function( q ) {
				return encodeURI( q );
			};
		});
	
}).call( this, angular );
