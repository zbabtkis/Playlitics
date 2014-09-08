/**
 * @package Playlitics.Data
 * Module declaration for Playlitics data
 */

;(function( ng ) {

	// Register submodule for Playlitics services
	ng.module('Playlitics.Data', []);
	
}).call( this, angular );
/**
 * Permalink
 * Build url safe links
 *
 * @package Playlitics.Data
 * @class   Service
 */
 
;(function( ng ) {

	ng.module("Playlitics.Data")

		.service("Permalink", function() {
			/**
			 * #create( name );
			 * Build URL safe name for routing
			 *
			 * @param { String } - name - name to convert
			 * @return { String } - safe name
			 */
			this.create = function ( name ) {
				var safe = name

					// Convert spaces and underscores to dashes
					.replace(/[\s_]+/g, "-")

					// Strip special characters
					.replace(/[^a-zA-Z\-]/g, '')

					// Make entire string lowercase 
					.toLowerCase();

				return safe;
			};
		})
	
}).call( this, angular );

/**
 * Spotify
 * Query Spotify API
 * 
 * @package Playlitics.Data
 * @class   Service
 */

;(function(ng) {

	"use strict";

	angular.module( 'Playlitics.Data' )

		.service( 'Spotify', function( $http ) {

			// Default settings for spotify query building
			var settings = {};

			// Spotify track query endpoint
			settings.API_ENDPOINT = "http://ws.spotify.com/search/1/track.json";

			/**
			 * #search( q )
			 * Create XHR query for matching songs in spotify library
			 *
			 * @param { String } - q search term
			 * @return { Promise } - promise of search response
			 */
			this.search = function( q ) {
				// CORS support
				delete $http.defaults.headers.common['X-Requested-With'];

				return $http.get(settings.API_ENDPOINT + "?q=" + this.safeQuery(q));
			};

			/**
			 * #safeQuery( q );
			 * Convert regular string to URI safe string
			 * 
			 * @param { String } - q - query string
			 * @return { String } URI safe string
			 */
			this.safeQuery = function( q ) {
				return encodeURI( q );
			};
		});
	
}).call( this, angular );

/**
 * Store
 * localStorage DataStore service
 * 
 * @package Playlitics.Data
 * @class   Service
 */
;(function ( ng ) {

	"use strict";

	/**
	 * StoreNotFoundError
	 * Thrown if a requested data store has no data
	 * 
	 * @inherits ReferenceError
	 */
	function StoreNotFoundError ( msg ) {
		this.name    = 'StoreNotFound';
		this.message = msg;
		this.stack   = (new Error).stack;
	}

	StoreNotFoundError.prototype = new ReferenceError;

	// Use Playlitics.Data namespace for service
	ng.module('Playlitics.Data')

		.service( 'Store', function( $window, $q) {

			// provate handle to vendor specific localStorage
			var Store = $window.localStorage || $window.webkitLocalStorage || $window.mozLocalStorage || {};

			// publically accessible handle to localStorage impelemntation 
			this._storage = Store;

			/**
			 * #fetch()
			 * Fetch a stored value by storeName
			 * 
			 * @param { String } - storeName - key in localStorage to load value from
			 * @return { Promise } - resolves with stored data if available or rejects
			 *   with error of store doesn't exist
			 */
			this.fetch = function( storeName ) {
				var d = $q.defer();

				// Query localStorage for store name
				var store = Store[ storeName ];

				// If store hasn't been created, reject promise with StoreNotFound error
				if ( typeof store === 'undefined' ) { 
					d.reject( 
						new StoreNotFoundError( 'Error: No store exists with name ' + storeName )
					);
				} else {
					d.resolve( this.deserialize( Store[ storeName ] ) );
				}

				// Return a promise for rejected or resolved store request
				return d.promise;
			};

			/**
			 * #deserialize( data );
			 * Covert localStorage safe string back to an object
			 * 
			 * @param  { String } - data - string to be converted to object
			 * @return { Object } - JS object deserialized from string
			 */
			this.deserialize = function ( data ) {
				return ng.fromJson(data);
			};

			/**
			 * #serialize( data );
			 * Covert JS object to localStorage safe string
			 * 
			 * @param  { Object } - data - JS object to serialize
			 * @return { String } - serialized string from object
			 */
			this.serialize = function ( data ) {
				return ng.toJson(data);
			};

			/**
			 * #persist( storeName, data );
			 * Save an object to localStorage
			 *
			 * @param  { String } - storeName - key to use to retrieve data from store
			 * @return { Promise } - for interface compatibility
			 */
			this.persist = function ( storeName, data ) {
				var d = $q.defer();

				d.resolve(
					Store[ storeName ] = this.serialize( data )
				);

				return d.promise;
			};
		});

}).call( this, angular );


/**
 * @package Playlitics.Filters
 * Module declaration for Playlitics.Filters
 */

;(function( ng ) {

	"use strict";

	ng.module("Playlitics.Filters", []);
	
}).call(this, angular);

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

/**
 * @package Playlitics.DOM
 * Module declaration for Playlitics.DOM
 */
;(function( ng ) {

	"use strict";

	ng.module("Playlitics.DOM", []);

}).call( this, angular );

/**
 * SpotifySearch
 * Spotify search widget for querying Spotify service
 *
 * @package Playlitics.DOM
 * @class 	Service
 */
;(function( ng ) {

	"use strict";

	ng.module("Playlitics.DOM")

		.directive("spotifySearch", function ( $rootScope ) {

			return {

				// tagNames are hardcore and thus cool
				restrict: "E",

				// Allow child elements to exist and inherit
				// search results
				transclude: true,

				// Load template over HTTP... Prettier that way.
				templateUrl: "views/spotifysearch.html",

				// Create controller with shared scope for track list
				controller: "SpotifySearchCtrl",

				// build functionality around each spotify-search widget
				link: function( scope, el, attr ) {

					/**
					 * #onSearcgChange()
					 * Runs whenever the user's search text changes
					 */
					scope.onSearchChange = function ( ) {

						// Get the current value of the input
						var q = scope.sq;

						// If query string is empty, empty song list 
						// and don't run query
						if ( !q ) {
							return scope.tracks = [];
						}

						// If valid search, send Spotify API call
						scope.runSearch ( q );

					};

					$rootScope.$on("trackSelected", function() {
						scope.sq = "";
					});

					// when search changes, update songs list
					scope.$watch('sq', scope.onSearchChange);
						
				}

			};
			
		})

}).call( this, angular );

/**
 * trackList
 * A directive for listing songs
 * 
 * @package Playlitics.DOM
 * @class   Directive
 */
;(function( ng ) {

	"use strict";

	ng.module("Playlitics.DOM")
		
		.directive( "trackList", function( $parse, $rootScope ) {
			return {
				restrict: 'EA',
				
				templateUrl: 'views/tracklist.html',

				link: function( scope, el, attr ) {
					var trackSelectCallback = $parse(attr['onTrackSelect'])(scope);

					scope.trackSelect = function( track ) {
						$rootScope.$broadcast("trackSelected", track);
						trackSelectCallback( track );
					};
				}
			};
		});

}).call( this, angular );

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
/**
 * PlaylistsCtrl
 * Handles playlist creation, deletion and listing
 *
 * @package Playlitics
 * @class   Controller
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
			function __createPlaylist () {
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
			function __persistPlaylists () {
				Store.persist( STORE_NAME, $scope.playlists );
			}

			/**
			 * #createPlaylist( playlist );
			 * Given a playlist name, adds a new playlist to list
			 *
			 * @param { String } - name - name of new playlist
			 */
			$scope.addPlaylist = function ( playlist ) {

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
			$scope.loadPlaylists = function ( store ) {
				Store.fetch( store )
					.then(function(data) {
						$scope.playlists = data;
					});
			};

			/**
			 * #getPermalink();
			 * Get URI safe permalink
			 */
			$scope.getPermalink = function ( name ) {
				return Permalink.create( name );
			};

			$scope.getCoolnessFactor = function ( playlist ) {
				var coolness = playlist.tracks.reduce( function( total, track ) {
					return total + (track.length * track.popularity);
				}, 0);

				return coolness / $scope.getDuration( playlist );
			};

			$scope.getDuration = function ( playlist ) {
				return playlist.tracks.reduce( function (total, track ) {
					return total + track.length;
				}, 0);
			};

			// On fist load, load all cached playlists
			$scope.loadPlaylists( STORE_NAME );

			// When playlist is added or removed, save it back to Store
			$scope.$watch('playlists', __persistPlaylists, true);

		});

}).call( this, angular );


/**
 * SpotifySearchCtrl
 * Provides tracks array and method fo querying spotify
 * throuh the Spotify service
 *
 * @package Playlitics
 * @class   Controller
 */
;(function( ng ) {
	
	"use strict";

	ng.module("Playlitics")

		.controller("SpotifySearchCtrl", function($scope, Spotify) {

			// Holds tracks returned from Spotify search query
			$scope.tracks = [];	

			/**
			 * #runSearch( q );
			 * Query's spotify service for tracks
			 * 
			 * @param { String } - q - user's search text
			 */
			$scope.runSearch = function ( q ) {

				// Query spotify service for given song name
				Spotify.search( q )
					.then( function( response ) {

						// Remove existing error if any
						// @TODO use error reporting service
						delete $scope.error;

						// Set data on scope
						$scope.tracks = response.data.tracks;
					})
					.catch( function( error ) {

						console.debug( error );

						// @TODO add error reporting here
						// notify error
						$scope.error = error;
					});
			};
			
		});
	
}).call( this, angular );
