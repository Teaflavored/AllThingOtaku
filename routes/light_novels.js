var express = require("express");
var router = express.Router();
var LightNovel = require("../models/light_novel");

router.get("/", function(req, res, next) {
	LightNovel.find({}, function (err, lightNovels) {
		if (err) {
			console.log("Error in retrieving light novels");
			res.status(500);
		} else {
			res.send(lightNovels);
		}
	});
});

module.exports = router;
