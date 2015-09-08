var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chapterSchema = new Schema({
    chapterNum: Number,
    chapterText: String
});

var Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
