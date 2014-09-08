;(function( ng ) {

	ng.module('Playlitics')

		.controller('PlaylistCtrl', function( $scope, $state, $stateParams, Permalink ) {

			// Find playlist in store
			$scope.playlist = $scope.playlists.reduce(function( buff, curr ) {
				return Permalink.create( curr.name ) === $stateParams.permalink ? curr : buff;
			}, {});
			
			$scope.addtrack = function( track ) {
				$scope.playlist.tracks.push( track );
			};
		});
	
}).call( this, angular );