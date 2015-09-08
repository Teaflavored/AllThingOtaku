var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require("./components/app.jsx");
var Home = require("./components/route_handlers/home.jsx");

//light novel route handlers
var LightNovelIndex = require("./components/route_handlers/light_novel_index/light_novel_index.jsx");
var LightNovelShow = require("./components/route_handlers/light_novel_show/light_novel_show.jsx");
var LightNovelNew = require('./components/route_handlers/light_novel_new/light_novel_new.jsx');
var ChapterShow = require("./components/route_handlers/chapter_show/chapter_show.jsx");
var Signup = require("./components/route_handlers/signup.jsx");
var Login = require("./components/route_handlers/login.jsx");

var routes = (
    <Route handler={App} path="/">
        <Route name="lightNovelCreate" path="/lightNovel/new" handler={LightNovelNew}/>
        <Route name="lightNovelShow" path="/lightNovel/:lightNovelId" handler={LightNovelShow} />
        <Route name="lightNovelsIndex" path="/lightNovels" handler={LightNovelIndex}/>
        <Route name="chapterShow" path="/lightNovel/:lightNovelId/volume/:volumeId/chapter/:chapterId" handler={ChapterShow} />
        <Route name="signup" path="/signup" handler={Signup} />
        <Route name="login" path="/login" handler={Login} />
        <DefaultRoute name="home" handler={Home}/>
    </Route>
);

module.exports = routes;
