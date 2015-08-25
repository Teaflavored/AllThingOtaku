var React = require("react");
var Router = require("react-router");
var Navbar = require("./header/navbar.jsx");
var appCSS = require("./app.js.css");
var RouteHandler = Router.RouteHandler;
var RouterPropTypes = require("react-router/lib/PropTypes");

var App = React.createClass({
	contextTypes: {
		router : RouterPropTypes.router.isRequired,
		getStore : React.PropTypes.func.isRequired,
		executeAction : React.PropTypes.func.isRequired
	},
	statics: {
			 },
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
