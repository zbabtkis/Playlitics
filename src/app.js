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
		'ui.router',
		'Playlitics.Data',
		'Playlitics.DOM']);

	app.config(function($stateProvider) {
		$stateProvider
			.state('playlist', {
				url: '/:permalink',
				templateUrl: 'views/playlist.html',
				controller: 'PlaylistCtrl'
			});
	});

}).call( this, angular )

