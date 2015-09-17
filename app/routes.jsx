var React = require("react");
var ReactRouter = require("react-router");
var IndexRouter = ReactRouter.IndexRoute;
var Route = ReactRouter.Router;

//components
var App = require("./components/app.jsx");
var Home = require("./components/route_handlers/home/home.jsx");
var LightNovelIndex = require("./components/route_handlers/light_novel_index/light_novel_index.jsx");
var LightNovelShow = require("./components/route_handlers/light_novel_show/light_novel_show.jsx");
var LightNovelNew = require('./components/route_handlers/light_novel_new/light_novel_new.jsx');
var LightNovelEdit = require("./components/route_handlers/light_novel_edit/light_novel_edit.jsx");
var ChapterShow = require("./components/route_handlers/chapter_show/chapter_show.jsx");
var Signup = require("./components/route_handlers/signup/signup.jsx");
var Login = require("./components/route_handlers/login/login.jsx");
var NotFound = require("./components/route_handlers/notfound/notfound.jsx");
var Disclaimer = require("./components/route_handlers/disclaimer/disclaimer.jsx");

var routes = (
    <Route component={App} path="/">
        <IndexRouter component={Home}/>

        <Route component={LightNovelNew} path="/lightNovels/new" />
        <Route component={LightNovelEdit} path="/lightNovels/:lightNovelId/edit" />
        <Route component={ChapterShow} path="/lightNovels/:lightNovelId/volume/:volumeNum/chapter/:chapterNum" />
        <Route component={LightNovelShow} path="/lightNovels/:lightNovelId" />
        <Route component={LightNovelIndex} path="/lightNovels" />

        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
    </Route>
);

module.exports = routes;
