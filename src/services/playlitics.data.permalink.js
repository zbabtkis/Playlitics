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
