var React = require("react");
var Router = require("react-router");
var Navbar = require("./header/navbar.jsx");
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
	render: function () {
				debugger
				return (
						<div> 
							<div id="header"><Navbar/></div>
							<RouteHandler />	
						</div>
					);
			}
});

module.exports = App;
