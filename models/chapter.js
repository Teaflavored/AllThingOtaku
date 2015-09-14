var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chapterSchema = new Schema({
    chapterName: {
        type: String
    },
    chapterNum: Number,
    chapterText: String
});

var Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
