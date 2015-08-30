var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;
var fluxibleAddons = require("fluxible-addons-react");

//stores
var userStore = require("../../stores/user_store");

//actions
var createUser = require("../../actions/create_user");

var NewUser = React.createClass({
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
                        <input type="submit" value="Create" className="btn btn-primary btn-block" onClick={this.handleCreate}/>
                    </div>
                </form>
            </div>
        );
    }
});

NewUser = fluxibleAddons.connectToStores(NewUser, [userStore], function (context, props){
    return {
        error : context.getStore(userStore).getError()
    };
});
module.exports = NewUser;