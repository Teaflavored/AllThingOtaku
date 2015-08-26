var express = require('express');
var router = express.Router();
var React = require("react");
var app = require("../app/");
var async = require("async");
var lightNovelService = require("../service/light_novel");
//client routing requires
var ReactRouter = require("react-router");
var expressState = require("express-state");
var pluginInstance = app.getPlugin("FetchrPlugin");

var fluxibleAddons = require('fluxible-addons-react');

pluginInstance.registerService(lightNovelService);
router.use(pluginInstance.getXhrPath(), pluginInstance.getMiddleware());

router.get("*", function (req, res, next) {
	var context = app.createContext({
		req: req,
		xhrContext: {
			lang: "en-US"
		}
	});
	
	ReactRouter.run(app.getComponent(), req.path, function (Root, state) {
		//if no matching routes found, then go to 404
		if (state.routes.length === 0) {
			res.status(404);
		}
		async.filterSeries(
			state.routes.filter(function (route){
				return route.handler.loadAction ? true : false		
			}),
			function (route, done) {
				context.getActionContext().executeAction(route.handler.loadAction, { params: state.params, query: state.query }, done);
			},
			function () {
				console.log("Rendering Server React Components");
				res.expose(app.dehydrate(context), app.uid);
				var RootComponent = fluxibleAddons.provideContext(Root, {
					getStore : React.PropTypes.func.isRequired,
					executeAction : React.PropTypes.func.isRequired
				});

				var markup = React.renderToString(<RootComponent {...state} context={context.getComponentContext()} /> )	

				res.render("index", {
						main: markup,
						uid: app.uid
				}, function (err, markup){
					if (err) {
						next(err);
					}
					res.send(markup);
				} );
			}
		);
	});
});

module.exports = router;
