var React = require("react");
var Router = require("react-router");
var Navbar = require("./header/navbar.jsx");
var RouteHandler = Router.RouteHandler;
var appCSS = require("./app.js.css");

var App = React.createClass({
	render: function () {
				return (
						<div> 
							<Navbar />
							<div id="mainContent" className="container" style={appCSS.mainContent}>
								<RouteHandler />	
							</div>
						</div>
					);
			}
});

module.exports = App;
