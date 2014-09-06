describe("Store", function() {
	
	beforeEach(function() {
		module("Playlitics.Store");
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
