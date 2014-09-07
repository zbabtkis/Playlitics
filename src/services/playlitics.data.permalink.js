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
				return "#/" + name.replace(/[\s]+/g, "-").toLowerCase();
			};
		})
	
}).call( this, angular );
