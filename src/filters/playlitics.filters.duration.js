/**
 * Duration
 * Converts a seconds float value to minutes:seconds format.
 * 
 * @package Playlitics.Filters
 * @class   Filter
 */

;(function( ng ) {

	"use strict";

	ng.module('Playlitics.Filters')

		.filter('duration', function() {

			return function ( input ) {
				var minutes = Math.floor(input / 60)
				  , seconds = Math.floor(input) % 60;

				return minutes + ":" + ("0" + seconds).slice(-2);
			};

		});
	
}).call( this, angular );
