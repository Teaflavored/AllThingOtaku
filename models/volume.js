var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Chapter = require("./chapter");
var _ = require("lodash");

var volumeSchema = new Schema({
    volumeNum: {
        type: Number,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    chapters: [Chapter.schema],
    chaptersCount: {
        type: Number,
        default: 0
    },
    pubDate: Date
});


volumeSchema.methods.toObjectNoChapters = function () {
    tempVolume = this.toObject();
    return _.omit(tempVolume, "chapters");
};
var Volume = mongoose.model("Volume", volumeSchema);
module.exports = Volume;
