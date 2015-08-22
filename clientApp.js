var React = require("react");
var Navbar = require("./react_components/header/navbar.jsx");

document.addEventListener("DOMContentLoaded", function () {
	React.render(
			React.createElement(Navbar),
			document.getElementById("mainHeader")
	);
});
