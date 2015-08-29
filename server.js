require("node-jsx").install({extension: ".jsx"});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressState = require("express-state");
var React = require("react");
var mainApp = require("./app/");

//services
var lightNovelService = require("./service/light_novel_service");
var ReactRouter = require("react-router");
var pluginInstance = mainApp.getPlugin("FetchrPlugin");
var fluxibleAddons = require('fluxible-addons-react');

var app = express();

expressState.extend(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

pluginInstance.registerService(lightNovelService);
app.use(pluginInstance.getXhrPath(), pluginInstance.getMiddleware());

app.get("*", function (req, res, next) {
    var context = mainApp.createContext({
        req: req,
        xhrContext: {
            lang: "en-US"
        }
    });

    ReactRouter.run(mainApp.getComponent(), req.path, function (Root, state) {
        //if no matching routes found, then go to 404
        if (state.routes.length === 0) {
            res.status(404);
        }

        var RootComponent = fluxibleAddons.provideContext(Root, {
            getStore: React.PropTypes.func.isRequired,
            executeAction: React.PropTypes.func.isRequired
        });

        var loadAction = state.routes[1].handler.loadAction;
        var renderReactOnServer = function () {
            var markup = React.renderToString(React.createElement(RootComponent, React.__spread({}, state, {context: context.getComponentContext()})));
            res.expose(mainApp.dehydrate(context), mainApp.uid);

            console.log("Rendering Server React Components");
            res.render("index", {
                main: markup,
                uid: mainApp.uid
            }, function (err, markup) {
                if (err) {
                    next(err);
                }
                res.send(markup);
            });
        };

        if (loadAction) {
            context.getActionContext().executeAction(loadAction, {
                params: state.params,
                query: state.query
            }, renderReactOnServer);
        } else {
            renderReactOnServer();
        }

    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
