var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Navigation = Router.Navigation;
var fluxibleAddons = require("fluxible-addons-react");

//stores
var userStore = require("../../../stores/user_store");
var authenticationStore = require("../../../stores/authentication_store");

//actions
var createUser = require("../../../actions/create_user");

var Signup = React.createClass({
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
    handleCreate: function () {
        this.context.executeAction(createUser, {
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
            <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <form action="javascript:void(0);" className="card">
                    <h3 className="text-center">Sign Up</h3>
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
                        <input type="submit" value="Sign Up" className="btn btn-primary btn-block" onClick={this.handleCreate}/>
                    </div>
                    <Link className="small" to="login">Already have an account? Log In</Link>
                </form>
            </div>
        );
    }
});

Signup = fluxibleAddons.connectToStores(Signup, [userStore, authenticationStore], function (context, props){
    return {
        error : context.getStore(userStore).getError(),
        isLoggedIn : context.getStore(authenticationStore).isLoggedIn()
    };
});
module.exports = Signup;