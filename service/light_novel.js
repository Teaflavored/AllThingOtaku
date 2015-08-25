var LightNovel = require("../models/light_novel");

var lightNovelService = {
	name: "lightNovels",
	read: function (req, resource, params, config, callback) {
		LightNovel.find({}, function (err, lightNovels) {
			if (err) {

			} else {
				callback(null, lightNovels);
			}
		});
	},
	get: function () {

		 },
	create: function () {

			},
	update: function () {

			},
	delete: function () {

			}
};
module.exports = lightNovelService;
