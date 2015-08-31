var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;
var fluxibleAddons = require("fluxible-addons-react");

//stores
var authenticationStore = require("../../stores/authentication_store");

//actions
var authenticate = require("../../actions/authenticate");

var Login = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            email: "",
            password: ""
        };
    },
    getDefaultProps: function () {
        return {
            isLoggedIn: false
        }
    },
    componentDidMount: function () {
        if (this.props.isLoggedIn) {
            this.transitionTo("home");
        }
    },
    handleEmailchange: function (event) {
        this.setState({
            email: event.target.value
        });
    },
    handlePasswordChange : function () {
        this.setState({
            password: event.target.value
        });
    },
    handleLogin: function () {
        this.context.executeAction(authenticate, {
            body : this.state,
            component: this
        })
    },
    render: function () {
        var error = this.props.error;
        var errorNode;
        if (error) {
            errorNode = <div className="alert-danger alert">{error.message}</div>;
        } else {
            errorNode = "";
        }
        return (
            <div className="col-md-4 col-md-offset-4">
                <form action="javascript:void(0);" className="card">
                    {errorNode}
                    <div className="form-group">
                        <label htmlFor="username">E-mail</label>
                        <input type="text" className="form-control" onChange={this.handleEmailchange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Log In" className="btn btn-primary btn-block" onClick={this.handleLogin}/>
                    </div>
                </form>
            </div>
        );
    }
});

Login = fluxibleAddons.connectToStores(Login, [authenticationStore], function (context, props){
    return {
        error : context.getStore(authenticationStore).getError(),
        isLoggedIn : context.getStore(authenticationStore).isLoggedIn()
    };
});
module.exports = Login;