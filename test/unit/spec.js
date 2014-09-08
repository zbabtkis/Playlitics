<<<<<<< has-spotify-search-directive
=======
describe("PlaylistsCtrl", function () {

	function createPlaylist() {
		return {
			name: "",
			route: "",
			tags: [],
			tracks: []
		};
	}

	beforeEach(function() {
		module("Playlitics");
	});

	beforeEach(inject(function($controller, $rootScope, $q) {

		// Mock store
		this.Store = {
			_data: {},
			fetch: function(store) {
				var d = $q.defer();

				if( this._data[store] ) {
					d.resolve(this._data[store]);
				} else {
					d.reject("Error");
				}

				return d.promise;
			},
			persist: function(store, data) {
				this._data[store] = data;
			}
		};

		this.scope = $rootScope.$new();
		this.$rootScope = $rootScope;

		this.ctrl = $controller('PlaylistsCtrl', {
			$scope: this.scope,
			Store: this.Store
		});
		
	}));

	describe("#addPlaylist", function() {
		it("adds a playlist object to $scope.playlists", function() {
			// setup
			var playlist = createPlaylist();

			playlist.name = "life is strange";

			// run addPlaylist()
			this.scope.addPlaylist(playlist);

			// assert that playlist is now in array
			expect(this.scope.playlists.indexOf(playlist)).not.toEqual(-1);
		});

		it("Resets nextPlaylist on scope", function() {
			// setup
			var playlist = this.scope.nextPlaylist = createPlaylist();

			playlist.name = "life is good though";

			// run addPlaylist()
			this.scope.addPlaylist(playlist);

			// assert that nextPlaylist has been reset
			expect(this.scope.nextPlaylist).not.toEqual(playlist);
		});

		it("doesn't add playlist if name is null", function() {
			// setup
			var playlist = createPlaylist();

			// run addPlaylist()
			this.scope.addPlaylist(playlist);

			// assert that playlist is not in array
			expect(this.scope.playlists.indexOf(playlist)).toEqual(-1);
		});

		it("doesn't allow playlist with same name as an existing playlist", function() {
			var _this = this;

			// setup
			var playlist1 = createPlaylist()
			  , playlist2 = createPlaylist();

			playlist1.name = playlist2.name = "we are all the same";

			// run addPlaylist()
			this.scope.addPlaylist(playlist1);

			expect(function() {
				_this.scope.addPlaylist(playlist2)
			}).toThrow();
		})
	});

	describe("#loadPlaylists()", function() {
		it("loads an array of playlists into $scope.playlists", function() {
			this.Store._data.playlists = [createPlaylist()];

			this.Store._data.playlists[0].name = "the birds and the bees";

			runs(function() {
				this.scope.loadPlaylists( "playlists" );
				this.$rootScope.$digest();
			});

			waitsFor(function() {
				return this.scope.playlists.length;
			}, "playlists has length", 500);

			runs(function() {
				expect(this.scope.playlists.length).toEqual(1);
			});
		});

		it("doesn't overwrite exitsting playlists in $scope.playlists", function() {
			var playlist1 = createPlaylist()
			  , playlist2 = createPlaylist();

			playlist1.name = "onesong";
			playlist2.name = "twosongs";

			this.scope.playlists = [playlist1];	
			this.Store._data.playlists = [playlist2];

			runs(function() {
				this.scope.loadPlaylists( "playlists" );
				this.$rootScope.$digest();
			});

			waitsFor(function() {
				return this.scope.playlists.length === 2;
			}, "playlists has length", 50);

			runs(function() {
				expect(this.scope.playlists[0].name).toEqual("onesong");
				expect(this.scope.playlists[1].name).toEqual("twosongs");
			});

		});
	});
});

>>>>>>> local
describe("Playlitics.Data.Store", function() {
	
	beforeEach(function() {
		module("Playlitics.Data");
	});

	beforeEach(inject(function($window, $rootScope, Store) {
		this.$window = $window;
		this.Store = Store;
		this.$rootScope = $rootScope;
	}));



	describe("when fetching a stored value", function() {

		it("resolves a StoreNotFoundError if no store exists", function() {

			// setup
			var response;


			// run
			runs(function() {
				this.Store.fetch('tests')
					.catch(function(data) {
						response = data;
					});

				// Allow promises to be resolved
				this.$rootScope.$digest();
			});

			// assert
			runs(function() {
				expect(response.message).toEqual('Error: No store exists with name tests');
			});
		});

		it("resolves a deserialized object", function() {

			// setup
			var greeting = JSON.stringify({greeting: "hello"})
				, response;

			this.Store._storage['greeting'] = greeting;

			// run
			runs(function() {
				this.Store.fetch('greeting')
					.then(function(data) {
						response = data;
					})
					.catch(function( error ) {
						console.debug( error );
					});

				// Allow promises to be resolved
				this.$rootScope.$digest();
			});

			// assert
			runs(function() {
				expect(response.greeting).toEqual('hello');
			});
		});

	});

	describe("when persisting a stored value", function() {

		it("serializes the stored object", function() {
			// setup 
			var greeting = {greeting: "hey there!"}; 

			spyOn(this.Store, 'serialize').andCallThrough();;

			// run
			this.Store.persist('greeting', greeting);

			// assert
			expect(this.Store.serialize).toHaveBeenCalledWith(greeting)
		});

		it("stores serialized object", function() {
			// setup 
			var playlist = {playlist: ["feets too big"]}; 

			// run
			this.Store.persist('playlist', playlist);

			// assert
			expect(this.Store._storage.playlist).toEqual(JSON.stringify(playlist));
		});
	});
	
});

describe("Playlitics.Data.Spotify", function() {

	beforeEach(function() {
		module("Playlitics.Data");
	});

	beforeEach(inject(function( Spotify, $httpBackend ) {
		var songs = ["hello", "goodbye"];

		$httpBackend.expectJSONP(/http\:\/\/ws.spotify.com.*?/g)
			.respond(201, songs);

		this.$httpBackend = $httpBackend;
		this.Spotify = Spotify;
	}));

	describe("searching spotify songs", function() {

		it("resolves returned promise with an array in data property", function() {

			// setup
			var response;

			// run
			runs(function() {
				this.Spotify.search("jack")
					.then(function( data ) {
						response = data;
					})
					.catch(function(message) {
						console.debug( message );
					});

				this.$httpBackend.flush()
			});

			waitsFor(function() {
				return response;
			}, "search yields results", 100);

			// assert
			runs(function() {
				expect(response.data instanceof Array).toBe(true);
			});

		});

	});

	describe("converting query to safe URI string", function() {
		it("converts query string to URI safe string", function() {
			
			// assert
			expect(this.Spotify.safeQuery('Jack Johnson')).toBe('Jack%20Johnson');
		});
	});

});

describe("Playlitics.DOM.spotifySearch", function() {

	beforeEach(function () {

		angular.module("Mocks", [])
			.service('Spotify', function( $q ) {
				this.search = function() {
					return $q.defer().promise;
				};
			});

		angular.module("Test", ["Playlitics.DOM", "Mocks"]);

		module("Test");
		module("template.html")
	});

	beforeEach(inject(function($rootScope, $compile, Spotify) {
		this.scope    = $rootScope;
		this.$compile = $compile;
	}));

	afterEach(function() {
		delete this.$rootScope;
		delete this.$compile;
	});

	describe("when typing", function() {
		it("should trigger refresh of matched songs", inject(function(Spotify) {
			var scope = this.scope, el;

			el = this.$compile('<spotify-search></spotify-search>')(scope);

			scope.$apply();

			spyOn(scope, 'runSearch');

			scope.$apply(function() {
				scope.sq = "Sitting, Waiting, Wishing";
			});

			expect(scope.runSearch).toHaveBeenCalled();

		}));

		describe("an empty string", function() {
			var scope, el;

			beforeEach(function() {
				scope = this.scope;

				el = this.$compile('<spotify-search></spotify-search>')(scope);

				scope.$apply();

				scope.$apply(function() {
					scope.sq = "Sitting, Waiting, Wishing";

					// Let's pretend that resolved an array of... numbers.
					scope.tracks = [1, 2, 3];
				});

				spyOn(scope, 'runSearch');

				scope.$apply(function() {
					scope.sq = "";
				});

			});

			it("doesn't call spotofy API", function() {

				expect(scope.runSearch).not.toHaveBeenCalled();

			});

			it("empties existing track list", function() {

				expect(scope.tracks.length).toEqual(0);

			});

		})

	});

});
