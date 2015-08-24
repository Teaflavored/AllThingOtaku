var express = require('express');
var router = express.Router();
var React = require("react");
var app = require("../app/");
var async = require("async");

//client routing requires
var ReactRouter = require("react-router");
var expressState = require("express-state");

router.get("*", function (req, res, next) {
	var context = app.createContext();
	
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
				var markup = React.renderToString(<Root {...state} context={context.getComponentContext()} /> )	
				res.expose(app.dehydrate(context), app.uid);
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
