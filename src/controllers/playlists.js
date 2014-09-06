/**
 * [ Controller ] PlaylistsCtrl
 *
 * Handles playlist creation, deletion and listing
 *
 * @requires Playlitics.Store
 */

;(function ( ng ) {

	"use strict";

	ng.module('Playlitics')

		.controller('PlaylistsCtrl', function ( $scope, Store, Playlist ) {
			// Name of data source
			var STORE_NAME = 'playlists';

			// Holds all existing playlists
			$scope.playlists = [];

			/**
			 * - __persistPlaylist();
			 * Save playlists array to Store
			 */
			function __persistPlaylists() {
				Store.persist( STORE_NAME, $scope.playlists );
			}

			/**
			 * #createPlaylist( playlist );
			 * Given a playlist name, adds a new playlist to list
			 *
			 * @param { String } - name - name of new playlist
			 */
			$scope.createPlaylist = function( playlist ) {
				$scope.playlists.push( playlist );	
			};

			/**
			 * #loadPlaylists( Store );
			 * Fetch an array of playlists from a store
			 *
			 * @param { Service } - Store - Storage source to fetch playlist data from
			 */
			$scope.loadPlaylists = function( Store ) {
				Store.fetch( STORE_NAME )
					.forEach( $scope.addPlaylist );
			};

			// On fist load, load all cached playlists
			$scope.loadPlaylists( Playlist );

			// When playlist is added or removed, save it back to Store
			$scope.watch('playlists', __persistPlaylists, true);

		});

}).call( this, angular );

