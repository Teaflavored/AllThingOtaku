var FluxibleApp = require("fluxible");
var fetchrPlugin = require("fluxible-plugin-fetchr");
var appDataStore = require("./stores/appDataStore");
var routes = require("./routes.jsx");
var fetchr = fetchrPlugin({
	xhrPath: "/api"
});

var app = new FluxibleApp({
	component: routes
});

app.uid = "allThingsOtaku";
app.registerStore(appDataStore);
app.plug(fetchr);

module.exports = app;
