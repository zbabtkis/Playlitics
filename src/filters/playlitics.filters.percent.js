/**
 * Percent
 * Converts a float into a percentage
 * 
 * @package Playlitics.Filters
 * @class Filter
 */

;(function( ng ) {

	"use strict";

	ng.module('Playlitics.Filters')

		.filter('percent', function() {

			return function ( input ) {
				return input ? (Number(input * 100).toPrecision(4)) + "%" : "0%";
			};
			
		});
	
}).call( this, angular );
