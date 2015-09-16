var React = require("react");
var app = require("./app");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var routes = require("./app/routes.jsx");
var fluxibleAddons = require("fluxible-addons-react");
var createBrowserHistory = require("history").createHistory;
var history = createBrowserHistory();

document.addEventListener("DOMContentLoaded", function () {
    var dehydratedState = window[app.uid];
    app.rehydrate(dehydratedState, function (err, context) {
        if (err) {

        }

        Router = fluxibleAddons.provideContext(Router);
        React.render( React.createElement(Router, {
                routes: routes,
                history: history,
                context: context.getComponentContext()
            }),
            document.getElementById(app.uid)
        );
    });
});
