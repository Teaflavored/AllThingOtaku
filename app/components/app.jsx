var React = require("react");
var Router = require("react-router");
var Navbar = require("./header/navbar.jsx");
var appCSS = require("./app.js.css");
var RouteHandler = Router.RouteHandler;
var FluxibleMixin = require("fluxible").FluxibleMixin;
var RouterPropTypes = require("react-router/lib/PropTypes");

var App = React.createClass({
	mixins: [FluxibleMixin],
	contextTypes: {
		router : RouterPropTypes.router.isRequired
	},
	statics: {
				 storeListeners: ["appStore"]
			 },
	onChange : function () {
				   console.log("got change");
				    var query = this.getStore("appStore").getQuery();
					this.context.router.replaceWith(this.props.pathname, null, query);
			   },
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

module.exports = App;
