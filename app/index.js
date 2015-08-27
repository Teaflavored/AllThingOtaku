var FluxibleApp = require("fluxible");
var fetchrPlugin = require("fluxible-plugin-fetchr");
var lightNovelStore = require("./stores/light_novel_store");
var routes = require("./routes.jsx");

var fetchr = fetchrPlugin({
	xhrPath: "/api"
});

var app = new FluxibleApp({
	component: routes
});

app.uid = "allThingsOtaku";
app.registerStore(lightNovelStore);
app.plug(fetchr);

module.exports = app;
