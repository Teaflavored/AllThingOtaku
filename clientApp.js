var React = require("react");
var Navbar = require("./react_components/header/navbar.jsx");
var routes = require("./clientRoutes.jsx");
var Router = require("react-router");

document.addEventListener("DOMContentLoaded", function () {
	Router.run(routes, Router.HistoryLocation, function(Root) {
		React.render(<Root />, document.getElementById("app"));
	});
});
