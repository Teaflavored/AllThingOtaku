var React = require("react");
var Router = require("react-router");
var Navbar = require("./header/navbar.jsx");
var appCSS = require("./app.css");
var RouteHandler = Router.RouteHandler;
var RouterPropTypes = require("react-router/lib/PropTypes");
var fluxibleAddons = require("fluxible-addons-react");

var App = React.createClass({
	render: function () {
				return (
						<div> 
							<Navbar />
							<div id="mainContent" className="container" style={appCSS.mainContent}>
								<RouteHandler {...this.props}/>
							</div>
						</div>
					);
			}
});

App = fluxibleAddons.provideContext(App, {
        executeAction : React.PropTypes.func.isRequired,
        getStore : React.PropTypes.func.isRequired
    }
);
module.exports = App;
