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
            isLoggedIn : false
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
                        <h1 style={navbarCSS.brandHeader}>
                            <Link to="home" className="navbar-brand">
                                AllThingsOtaku
                            </Link>
                        </h1>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link className="nav-btn" to="lightNovelsIndex">Light Novels</Link></li>
                        {
                            (function () {
                                if (!isLoggedIn) {
                                    return (
                                        <li><Link className="nav-btn" to="login">Log In</Link></li>
                                    );
                                }
                            })()
                        }
                        {
                            (function () {
                                if (isLoggedIn) {
                                    return (
                                        <li><a href="javascript:void(0);" className="nav-btn" onClick={logoutFn}>Log Out</a></li>
                                    )
                                }
                            })()
                        }
                    </ul>
                </div>
            </div>
        );
    }
});

Navbar = fluxibleAddons.connectToStores(Navbar, [authenticationStore], function (context, props){
    return {
        isLoggedIn : context.getStore(authenticationStore).isLoggedIn()
    };
});
module.exports = Navbar;
