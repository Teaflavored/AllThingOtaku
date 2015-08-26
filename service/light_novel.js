var LightNovel = require("../models/light_novel");
var mongoose = require("mongoose");

var lightNovelService = {
	name: "lightNovels",
	read: function (req, resource, params, config, callback) {
		var queryParams = {};

		if (params.id) {
			queryParams._id = mongoose.Types.ObjectId(params.id);
		}

		LightNovel.find().lean().exec(queryParams, function (err, lightNovels) {
			if (err) {
				callback(err);
			} else {
				callback(null, lightNovels);
			}
		});
	},
	create: function (req, resource, params, config, callback) {
				
			},
	update: function () {

			},
	delete: function () {

			}
};
module.exports = lightNovelService;
