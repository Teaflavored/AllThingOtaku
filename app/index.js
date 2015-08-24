var FluxibleApp = require("fluxible");
var appDataStore = require("./stores/appDataStore");
var routes = require("./routes.jsx");

var app = new FluxibleApp({
	component: routes
});

app.uid = "allThingsOtaku";
app.registerStore(appDataStore);

module.exports = app;
