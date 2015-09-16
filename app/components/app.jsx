var React = require("react");
var Router = require("react-router");
var appCSS = require("./app.css");
var fluxibleAddons = require("fluxible-addons-react");

//components
var Navbar = require("./header/navbar.jsx");
var Footer = require("./footer/footer.jsx");

var App = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div id="app">
                <Navbar {...this.props} />
                <div id="mainContent" className="container" style={appCSS.mainContent}>
                    {this.props.children}
                </div>
                <Footer {...this.props} />
            </div>
        );
    }
});

module.exports = App;
