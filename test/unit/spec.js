describe("PlaylistsCtrl", function () {

	describe("#createPlatlist", function() {
		it("adds a playlist object to $scope.playlists", function() {

		});
	});

	describe("#loadPlaylists()", function() {
		it("loads an array of playlists into $scope.playlists", function() {
			
		});

		it("doesn't overwrite exitsting playlists in $scope.playlists", function() {

		});
	});

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
