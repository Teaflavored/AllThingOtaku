var createdPlugin = function (schema, options) {
	schema.add({ created: Date });

	schema.pre("save", function (next) {
		if (!this.created) {
			this.created = new Date();
		}	
		next();
	});

	if (options && options.index) {
		schema.path("created").index(options.index);
	}
};


module.exports = createdPlugin;
