var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var modified= require("./last_mod");
var created= require("./created");

//embedded document schemas
var LightNovel = require("./light_novel");

var storySchema = new Schema({
	title: { type: String,
		     index: { unique: true },
		     required: true
		   },
	description: String,
	tags: String,
	lightNovels : [LightNovel.schema]
});

storySchema.plugin(modified);
storySchema.plugin(created);

storySchema.pre("save", function (next) {
	var self = this;
	mongoose.models["Story"].findOne( { title: new RegExp("^" + this.title + "$", "i") }, function (err, doc) {
		if (err) {
			next(err);
		} else if (doc) {
			self.invalidate("title", "title must be unique");
			next(new Error("title must be unique"));
		} else {
			next();
		}
	});
});
var Story = mongoose.model("Story", storySchema);

module.exports = Story;
