var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Chapter = require("./chapter");
var lastMod = require("./last_mod");
var created = require("./created");

var volumeSchema = new Schema({
	volume_num : {
					 type: Number,
					 index: true
				 },
	title: {
			   type: String
		   },
	chapters: [Chapter.schema],
	pub_date: Date
});

volumeSchema.plugin(lastMod);
volumeSchema.plugin(created);

var Volume = mongoose.model("Volume", volumeSchema);
module.exports = Volume;
