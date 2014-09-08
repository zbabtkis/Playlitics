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
			.state('playlists', {
				url: '/playlists',
				abstract: true,
				template: '<ui-view />'
			})
			.state('playlists.index', {
				url: '/',
				templateUrl: 'views/selectplaylist.html'
			})
			.state('playlists.details', {
				url: '/:permalink',
				templateUrl: 'views/playlist.html',
				controller: 'PlaylistCtrl'
			});
	});

}).call( this, angular )

