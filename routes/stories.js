var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Story = require("../models/story.js");

router.use("/" , function (req, res, next) {
	console.log(Story.find({}, function (err, stories) {
		if (err) {
			console.log("Error in retreiving stories");
			res.status(500);
		} else {
			res.send(stories);	
		}	
	}));
});

module.exports = router;
