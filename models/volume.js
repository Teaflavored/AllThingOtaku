var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Chapter = require("./chapter");
var lastMod = require("./last_mod");
var created = require("./created");

var volumeSchema = new Schema({
    volumeNum: {
        type: Number,
        default: -1,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    chapters: [Chapter.schema],
    pubDate: Date
});

volumeSchema.plugin(lastMod);
volumeSchema.plugin(created);

var Volume = mongoose.model("Volume", volumeSchema);
module.exports = Volume;
