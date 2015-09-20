var FluxibleApp = require("fluxible");
var fetchrPlugin = require("fluxible-plugin-fetchr");
var routes = require("./routes.jsx");

//stores
var lightNovelStore = require("./stores/light_novel_store");
var userStore = require("./stores/user_store");
var authenticationStore = require("./stores/authentication_store");
var chapterStore = require("./stores/chapter_store");
var lightNovelEditStore = require("./stores/light_novel_edit_store");
var reviewStore = require("./stores/review_store");

var fetchr = fetchrPlugin({
    xhrPath: "/api"
});

var app = new FluxibleApp({
    component: routes
});

app.uid = "lifeOfOtaku";

app.registerStore(lightNovelStore);
app.registerStore(authenticationStore);
app.registerStore(userStore);
app.registerStore(chapterStore);
app.registerStore(lightNovelEditStore);
app.registerStore(reviewStore);

app.plug(fetchr);

module.exports = app;
