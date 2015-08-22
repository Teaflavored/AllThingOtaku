var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chapterSchema = new Schema({
	chapter_num: {
					 type: Number,
					 min: 0
				 },
	chapter_name: {
					  type: String
				  },
	text: {
			  type: String
		  }
});

var Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
