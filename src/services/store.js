;(function ( ng ) {

	"use strict";

	function StoreNotFound () {
		ReferenceError.apply( this, arguments );
	}

	StoreNotFound.prototype = Object.create(ReferenceError.prototype);

	ng.app('Playlitics.Store', [])

		.service( 'Store', function( $window, $q) {

			var Store = $window.localStorage || $window.webkitLocalStorage || $window.mozLocalStorage;

			this.fetch = function( storeName ) {
				var d = $q.defer();

				// Query localStorage for store name
				var store = Store[ storeName ];

				// If store hasn't been created, reject promise with StoreNotFound error
				if ( typeof store === 'undefined' ) 
					d.reject(
						new StoreNotFoundError('Error: No store exists with name ' + store)
					);
				} else {
					d.resolve( this.deserialize( store ) );
				}

				// Return a promise for rejected or resolved store request
				return d.promise;
			};
		});

		this.persist = function ( storeName, data ) {
			Store[ storeName ] = this.serialize( data );
		};

}).call( this, angular );

