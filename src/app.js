/**
 * Module:Playlitics
 *
 * -- An application for building awesome Spotify playlists
 *
 * @author  Zachary Babtkis <zackbabtkis@gmail.com>
 * @license WTFPL
 */

;(function( ng ) {

	"use strict";

	// Register 'Playlitics' main app module
	var app = ng.module('Playlitics', [
		'Playlitics.Data',
		'Playlitics.DOM']);

}).call( this, angular )

