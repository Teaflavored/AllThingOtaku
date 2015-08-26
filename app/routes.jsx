var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var	App = require("./components/app.jsx");
var Home = require("./components/route_handlers/home.jsx");
var LightNovels = require("./components/route_handlers/light_novels.jsx");
var LightNovel = require("./components/route_handlers/light_novel.jsx");

var routes = (
		<Route handler={App}>
			<DefaultRoute handler={Home} />
			<Route name="lightNovel" path="/lightNovels/:id" handler={LightNovel} />
			<Route name="lightNovels" path="/lightNovels" handler={LightNovels} />
		</Route>		
		);

module.exports = routes;
