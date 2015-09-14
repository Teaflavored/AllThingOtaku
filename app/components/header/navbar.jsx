var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
// need to move the input into its own component, needs to handle auto complete and searching, can do later

//styling
var navbarCSS = require("./navbar.css");

//actions
var logout = require("../../actions/logout");

//helpers
var fluxibleAddons = require("fluxible-addons-react");

//listens to auth store for links
var authenticationStore = require("../../stores/authentication_store");

var Navbar = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getDefaultProps: function () {
        return {
            isLoggedIn: false
        };
    },
    handleLogOut: function () {
        this.context.executeAction(logout, {
            component: this
        });
    },
    render: function () {
        var isLoggedIn = this.props.isLoggedIn;
        var logoutFn = this.handleLogOut;
        return (
            <div id="navbar" className="navbar navbar-fixed-top" style={navbarCSS.headerContainer}>
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navigationItems" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <h1 style={navbarCSS.brandHeader}>
                            <Link to="home" className="navbar-brand">
                                Life of Otaku
                            </Link>
                        </h1>
                    </div>
                    <div className="collapse navbar-collapse" id="navigationItems">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link className="nav-btn" to="lightNovelsIndex">Light Novels</Link></li>
                            { isLoggedIn ?
                                <li><a href="javascript:void(0);" className="nav-btn" onClick={logoutFn}>Log Out</a>
                                </li>
                                : <li><Link className="nav-btn" to="login">Log In</Link></li> }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

Navbar = fluxibleAddons.connectToStores(Navbar, [authenticationStore], function (context, props) {
    return {
        isLoggedIn: context.getStore(authenticationStore).isLoggedIn()
    };
});
module.exports = Navbar;
