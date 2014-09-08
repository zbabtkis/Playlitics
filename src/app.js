/**
 * Playlitics
 *
 * -- An application for building awesome Spotify playlists
 *
 * @package Playlitics
 * @author  Zachary Babtkis <zackbabtkis@gmail.com>
 * @license WTFPL
 */

;(function( ng ) {

	"use strict";

	// Register 'Playlitics' main app module
	var app = ng.module('Playlitics', [
		'ui.router',
		'ngRepeatReorder',
		'Playlitics.Data',
		'Playlitics.DOM',
		'Playlitics.Filters']);

	app.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider

			// UI router's way of saying home...
			.state('playlists', {
				abstract: true,
				template: '<ui-view />'	
			})

			// Define what the home route's index page should look like
			.state('playlists.index', {
				url: '/',
				templateUrl: 'views/selectplaylist.html'
			})

			// The route for viewing a playlist
			.state('playlists.details', {
				url: '/:permalink',
				templateUrl: 'views/playlist.html',
				controller: 'PlaylistCtrl'
			});

		// If not on a playlist route, go to playlist index
		$urlRouterProvider
			.otherwise('/')
	});

}).call( this, angular )

