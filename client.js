var React = require("react");
var app = require("./app");
var Router = require("react-router");
var fluxibleAddons = require("fluxible-addons-react");

document.addEventListener("DOMContentLoaded", function () {
	var dehydratedState = window[app.uid];
	app.rehydrate(dehydratedState, function (err, context) {
		if (err) {
			
		}
		
		Router.run(app.getComponent(), Router.HistoryLocation, function (Root, state) {
			var RootComponent = fluxibleAddons.provideContext(Root,{
				getStore : React.PropTypes.func.isRequired,
				executeAction: React.PropTypes.func.isRequired
			});
			React.render(React.createElement(RootComponent, React.__spread({}, state, { context : context.getComponentContext()  })), document.getElementById(app.uid));
		});
	});
});
