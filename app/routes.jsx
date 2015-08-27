var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var	App = require("./components/app.jsx");
var Home = require("./components/route_handlers/home.jsx");
var LightNovelIndex = require("./components/route_handlers/light_novels_index.jsx");
var LightNovelShow = require("./components/route_handlers/light_novel_show.jsx");

var routes = (
		<Route handler={App} path="/">
            <Route name="lightNovelShow" path="/lightNovel/:id" handler={LightNovelShow} />
            <Route name="lightNovelsIndex" path="/lightNovels" handler={LightNovelIndex} />
			<DefaultRoute name="home" handler={Home} />
		</Route>
		);

module.exports = routes;
