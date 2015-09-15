var React = require("react");
var Router = require("react-router");
var appCSS = require("./app.css");
var RouterPropTypes = require("react-router/lib/PropTypes");
var fluxibleAddons = require("fluxible-addons-react");

//components
var RouteHandler = Router.RouteHandler;
var Navbar = require("./header/navbar.jsx");
var Footer = require("./footer/footer.jsx");

var App = React.createClass({
    render: function () {
        return (
            <div id="app">
                <Navbar {...this.props} />
                <div id="mainContent" className="container" style={appCSS.mainContent}>
                    <RouteHandler {...this.props}/>
                </div>
                <Footer {...this.props} />
            </div>
        );
    }
});

App = fluxibleAddons.provideContext(App, {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    }
);
module.exports = App;
