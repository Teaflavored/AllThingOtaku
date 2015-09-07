var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var modified = require("./last_mod");
var created = require("./created");

var chapterSchema = new Schema({
    chapterNum: Number,
    chapterName: String,
    chapterText: String
});

chapterSchema.plugin(modified);
chapterSchema.plugin(created);
var Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
