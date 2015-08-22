var express = require('express');
var router = express.Router();
var React = require("react");
var Navbar = require("../react_components/header/navbar.jsx");

/* GET home page. */
router.get('/', function(req, res, next) {
	var navbar = React.createElement(Navbar);
	res.render('index', { header : React.renderToString(navbar) });
});

module.exports = router;
