require("node-jsx").install({extension: ".jsx"});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressState = require("express-state");
var compression = require("compression");
var React = require("react");

//services
var lightNovelService = require("./service/light_novel_service");
var authenticateService = require("./service/authenticate_service");
var userService = require("./service/user_service");
var volumeService = require("./service/volume_service");
var chapterService = require("./service/chapter_service");

//router
var ReactRouter = require("react-router");

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
app.use(bodyParser.json());
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
//authentication
pluginInstance.registerService(lightNovelService);
pluginInstance.registerService(authenticateService);
pluginInstance.registerService(userService);
pluginInstance.registerService(volumeService);
pluginInstance.registerService(chapterService);

app.use(pluginInstance.getXhrPath(), pluginInstance.getMiddleware());

app.get("*", function (req, res, next) {
    var context = mainApp.createContext({
        req: req,
        xhrContext: {
            lang: "en-US"
        }
    });

    var router = ReactRouter.create({
        routes: mainApp.getComponent(),
        location: req.path,
        onAbort: function (options){
            var destination = options.to || "/";
            res.redirect(302, destination);
            console.log("Redirecting to: " + destination);
        }
    });

    router.run(function (Root, state) {
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
                title: "Life of Otaku, your number one stop for manga, anime, light novels, and all your japanese otaku needs.",
                uid: mainApp.uid
            }, function (err, markup) {
                if (err) {
                    next(err);
                }
                res.send(markup);
            });
        };

        //passing user object to authentication store on server side
        if (req.user) {
            context.getActionContext().dispatch("AUTHENTICATE_SUCCESS", req.user);
        }

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
