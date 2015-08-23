var express = require('express');
var router = express.Router();
var React = require("react");

//client routing requires
var ReactRouter = require("react-router");
var clientRoutes = require("../clientRoutes.jsx");

/* GET home page. */
router.get('/', function(req, res, next) {
	ReactRouter.run(clientRoutes, req.path, function (Root) {
		var root = React.createElement(Root);

		return res.render("index", {
			main: React.renderToString(root)
		});
	});
});

module.exports = router;
