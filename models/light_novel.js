var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var modified = require("./last_mod");
var created = require("./created");
var Volume = require("./volume");

var lightNovelSchema = new Schema({
	author: {
				type: String,
				required: true
			},
	title: {
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
				},
	volumes: [Volume.schema]
});

lightNovelSchema.plugin(modified);
lightNovelSchema.plugin(created);

//some custom validations
lightNovelSchema.pre("save", function (next) {
    var self = this;
    mongoose.models["LightNovel"].findOne({
        title: this.title
    }, function (err, lightNovel) {
        if (err) {
            next(err);
        } else if (lightNovel) {
            self.invalidate("title", "Light Novel title must be unique");
            next(new Error("Title must be unique"));
        } else {
            next();
        }
    });
});

var LightNovel = mongoose.model("LightNovel", lightNovelSchema);

module.exports = LightNovel;

