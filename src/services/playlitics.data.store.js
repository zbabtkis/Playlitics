/**
 * Playlitics.Data [ Service ] - Store
 * localStorage DataStore service
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

