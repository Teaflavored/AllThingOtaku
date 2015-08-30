var FluxibleApp = require("fluxible");
var fetchrPlugin = require("fluxible-plugin-fetchr");
var routes = require("./routes.jsx");

//stores
var lightNovelStore = require("./stores/light_novel_store");
var authenticationStore = require("./stores/authentication_store");

var fetchr = fetchrPlugin({
    xhrPath: "/api"
});

var app = new FluxibleApp({
    component: routes
});

app.uid = "allThingsOtaku";
app.registerStore(lightNovelStore);
app.registerStore(authenticationStore);

app.plug(fetchr);

module.exports = app;
