/**
 * PlaylistCtrl
 * Manages playlists throughout the app
 *
 * @package Playlitics
 * @class   Controller
 */

;(function( ng ) {

	ng.module('Playlitics')

		.controller('PlaylistCtrl', function( $scope, $state, $stateParams, Permalink ) {

			// Find playlist in store
			$scope.playlist = $scope.playlists.reduce(function( buff, curr ) {

				// If they have the same permalink use that model
				return Permalink.create( curr.name ) === $stateParams.permalink ? curr : buff;
			}, null);
			
			/**
			 * #addTrack( track );
			 * Add a track to the playlist
			 *
			 * @param { Spotify.Track } track  - track from spotify query to add to playlist
			 */
			$scope.addtrack = function ( track ) {
				$scope.playlist.tracks.push( track );
			};

			/**
			 * #removeTrack( track );
			 * Remove track from playlist
			 * 
			 * @param { Spotify.Track } track - track to remove from playlist
			 */
			$scope.removeTrack = function ( track ) {
				var trackIndex = $scope.playlist.tracks.indexOf( track );

				$scope.playlist.tracks.splice(trackIndex, 1);
			}

			/**
			 * #removeTag( tag );
			 * Removes tag from the playlist
			 * 
			 * @param { String } tag - tag to remove from list of tags
			 */
			$scope.removeTag = function ( tag ) {
				var tagIndex = $scope.playlist.tags.indexOf( tag );

				$scope.playlist.tags.splice(tagIndex, 1);
			};
		});
	
}).call( this, angular );