/**
 * Controller unit tests
 * 
 * @package Playlitics
 */

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

	describe("adding a playlist", function() {

		it("appends playlist object to $scope.playlists", function() {
			// setup
			var playlist = createPlaylist();

			playlist.name = "life is strange";

			// run addPlaylist()
			this.scope.addPlaylist(playlist);

			// assert that playlist is now in array
			expect(this.scope.playlists.indexOf(playlist)).not.toEqual(-1);
		});

		it("resets nextPlaylist on scope", function() {
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

	describe("loading playlists", function() {
		it("sets playlists from the store as playlists on the scope", function() {
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

	});

	describe("calculatingPlaylistLength", function() {
		it("should yield sigma of track length properties", function() {
			var tracks = [{length: 5}, {length: 10}];

			var playlist = {tracks: tracks};

			expect(this.scope.getDuration(playlist)).toEqual(15);
		})
	});

	describe("calculating coolness factor", function() {
		it("should yield the average popularity over the duration of the playlist", function() {
			var tracks = [{length: 5, popularity: .5}, {length: 10, popularity: .25}];

			var playlist = {tracks: tracks};

			expect(this.scope.getCoolnessFactor(playlist)).toEqual(1/3);
		});
	})
});