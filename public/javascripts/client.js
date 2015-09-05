var React = require("react");
var app = require("./app");
var Router = require("react-router");
var dehydratedState = window[app.uid];

document.addEventListener("DOMContentLoaded", function () {
	console.log("hi");
	app.rehydrate(dehydratedState, function (err, context) {
		if (err) {

		}
			
		Router.run(app.getComponent(). Router.HistoryLocation, function (Root, state) {
			console.log(state);
			console.log(context);
			React.render(<Root {...state} context={context.getComponentContext()}/>,
							document.getElementById(app.uid));
		});
	});
});
