var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Chapter = require("./chapter");
var _ = require("lodash");

var volumeSchema = new Schema({
    volumeNum: Number,
    title: {
        type: String,
        required: true
    },
    chaptersCount: {
        type: Number,
        default: 0
    },
    pubDate: Date,
    chapters: [Chapter.schema]
});


volumeSchema.methods.toObjectNoChapters = function () {
    tempVolume = this.toObject();
    return _.omit(tempVolume, "chapters");
};
var Volume = mongoose.model("Volume", volumeSchema);
module.exports = Volume;
