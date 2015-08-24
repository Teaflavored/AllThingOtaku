var React = require("react");
var app = require("./app");
var Router = require("react-router");

document.addEventListener("DOMContentLoaded", function () {
	var dehydratedState = window[app.uid];
	app.rehydrate(dehydratedState, function (err, context) {
		if (err) {
			
		}
		
		Router.run(app.getComponent(), Router.HistoryLocation, function (Root, state) {
			React.render(React.createElement(Root, React.__spread({}, state, { context : context.getComponentContext()  })), document.getElementById(app.uid));
		});
	});
});
