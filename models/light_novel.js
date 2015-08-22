var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var modified = require("./last_mod");
var created = require("./created");
var Volume = require("./volume");

var lightNovelSchema = new Schema({
	author: {
				type: String,
				required: true,
				index: { unique: true }
			},
	publication_date : {
						   type: Date
					   },
	completed : {
					type: Boolean,
					default: false,
					required: true
				},
	volumes: [Volume.schema]
});

lightNovelSchema.plugin(modified);
lightNovelSchema.plugin(created);

var LightNovel = mongoose.model("LightNovel", lightNovelSchema);

module.exports = LightNovel;

