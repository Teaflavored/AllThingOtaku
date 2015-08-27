var LightNovel = require("../models/light_novel");
var mongoose = require("mongoose");

var lightNovelService = {
	name: "lightNovels",
	read: function (req, resource, params, config, callback) {
		var queryParams = {};

		if (params.id) {
			LightNovel.findOne().lean().exec(params, function (err, lightNovel) {
				if (err) {
					callback(err);
				} else {
					callback(null, lightNovel)
				}
			});
		} else {
			LightNovel.find().lean().exec(queryParams, function (err, lightNovels) {
				if (err) {
					callback(err);
				} else {
					callback(null, lightNovels);
				}
			});
		}
	},
	create: function (req, resource, params, config, callback) {
				
			},
	update: function () {

			},
	delete: function () {

			}
};
module.exports = lightNovelService;
