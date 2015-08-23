var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var	App = require("./react_components/app.jsx");
var Home = require("./react_components/main/home.jsx");
var LightNovels = require("./react_components/main/light_novels.jsx");

var routes = (
		<Route handler={App}>
			<DefaultRoute handler={Home} />
			<Route path="/lightNovels" handler={LightNovels} />
		</Route>		
		);

module.exports = routes;
