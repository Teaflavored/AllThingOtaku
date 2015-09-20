var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressState = require("express-state");
var compression = require("compression");
var React = require("react");
var _ = require("lodash");

//services
var lightNovelService = require("./service/light_novel_service");
var authenticateService = require("./service/authenticate_service");
var userService = require("./service/user_service");
var volumeService = require("./service/volume_service");
var chapterService = require("./service/chapter_service");
var reviewService = require("./service/review_service");

//router

//fluxible app
var mainApp = require("./app/");
var pluginInstance = mainApp.getPlugin("FetchrPlugin");
var fluxibleAddons = require('fluxible-addons-react');

//session and authentication management
var mongoose = require("mongoose");
var User = require("./models/user");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//cloudinary
var cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

var app = express();
//allow exposing of extra data to client
expressState.extend(app);

//enabling compression
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: "3mb"
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var uri = process.env.MONGOLAB_URI || process.env.DB_URL;
var connection = mongoose.createConnection(uri);
var sessionSecret = process.env.SESSION_SECRET;

app.use(session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    function (email, password, done) {
        User.findOne({email: email}, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: "Incorrect email or password "});
            }

            user.validatePassword(password, function (err, isMatch) {
                if (err) {
                    done(err);
                } else if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Incorrect email or password"});
                }
            });

        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, "_id email role created modified", function (err, user) {
        if (err) {
            done(err);
        } else if (user) {
            done(err, user.toObject());
        } else {
            done(err, user);
        }
    });
});

//services
pluginInstance.registerService(lightNovelService);
pluginInstance.registerService(authenticateService);
pluginInstance.registerService(userService);
pluginInstance.registerService(volumeService);
pluginInstance.registerService(chapterService);
pluginInstance.registerService(reviewService);
app.use(pluginInstance.getXhrPath(), pluginInstance.getMiddleware());

//routing

var ReactRouter = require("react-router");
var RoutingContext = ReactRouter.RoutingContext;
var match = ReactRouter.match;
var createLocation = require("history").createLocation;


app.get("*", function (req, res, next) {
    var context = mainApp.createContext({
        req: req,
        xhrContext: {
            lang: "en-US"
        }
    });
    var location = createLocation(req.url);
    var routes = mainApp.getComponent();

    match({
        routes: routes,
        location: location
    }, function (error, redirectLocation, renderProps) {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.send(500, error.message);
        } else if (renderProps == null) {
            res.status(404).send("Not Found");
        } else {
            var loadAction = renderProps.routes[renderProps.routes.length - 1].component.loadAction;

            RoutingContext = fluxibleAddons.provideContext(RoutingContext, {
                executeAction: React.PropTypes.func.isRequired,
                getStore: React.PropTypes.func.isRequired
            });

            var renderReactOnServer = function () {
                var markup = React.renderToString(
                    <RoutingContext {...renderProps} context={context.getComponentContext()}/>
                );

                res.expose(mainApp.dehydrate(context), mainApp.uid);
                console.log("Rendering react elements on server");

                res.render("index", {
                        main: markup,
                        title: "Life of Otaku, your number one stop for manga, anime, light novels, and all your japanese otaku needs.",
                        uid: mainApp.uid
                    },
                    function (err, markup) {
                        if (err) {
                            next(err);
                        } else {
                            res.send(markup);
                        }
                    }
                );
            };

            if (req.user) {
                context.getActionContext().dispatch("AUTHENTICATE_SUCCESS", req.user);
            }

            if (loadAction) {
                context.getActionContext().executeAction(loadAction, {
                    params: renderProps.params
                }, renderReactOnServer);
            } else {
                renderReactOnServer();
            }
        }
    });
});

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