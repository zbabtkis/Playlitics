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

		.controller('PlaylistsCtrl', function ( $scope, Store, Permalink ) {
			// Name of data source
			var STORE_NAME = 'playlists';

			// Holds all existing playlists
			$scope.playlists = [];
			$scope.nextPlaylist = __createPlaylist();

			/**
			 * #__createPlaylist()
			 * build Playlist structure
			 * @return { Object } - playlist object
			 */
			function __createPlaylist() {
				return {
					name: "",
					route: "",
					tags: [],
					tracks: []
				};
			}

			/**
			 * #__persistPlaylist();
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
			$scope.addPlaylist = function( playlist ) {

				// Null playlist names should be ignored
				if ( !playlist || !playlist.name ) return;

				// Don't allow playlists that will have the same permalink as another
				$scope.playlists.forEach(function(list) {
					if ( Permalink.create( list.name ) === Permalink.create( playlist.name ) ) {
						throw new Error("Playlist with name " + list + " already exists");
					}
				})

				$scope.playlists.push( playlist );	
				$scope.nextPlaylist = __createPlaylist();
			};

			$scope.removePlaylist = function ( playlist ) {
				var index = $scope.playlists.indexOf( playlist );

				// Allow other parts of app to know that this playlist no longer exists
				playlist.destroyed = true;

				// Remove playlist from list
				$scope.playlists.splice(index, 1)
			};


			/**
			 * #loadPlaylists( Store );
			 * Fetch an array of playlists from a store
			 *
			 * @param { Service } - Store - Storage source to fetch playlist data from
			 */
			$scope.loadPlaylists = function( store ) {
				Store.fetch( store )
					.then(function(data) {
						$scope.playlists = data;
					});
			};

			/**
			 * #getPermalink();
			 * Get URI safe permalink
			 */
			$scope.getPermalink = function( name ) {
				return Permalink.create( name );
			};

			// On fist load, load all cached playlists
			$scope.loadPlaylists( STORE_NAME );

			// When playlist is added or removed, save it back to Store
			$scope.$watch('playlists', __persistPlaylists, true);

		});

}).call( this, angular );

