var React = require("react");

var Login = React.createClass({
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
    handleLogin: function () {
        console.log(this.state);
    },
    render: function () {
        return (
            <div className="col-md-4 col-md-offset-4">
                <form action="javascript:void(0);" className="card">
                    <div className="form-group">
                        <label for="username">E-mail</label>
                        <input type="text" className="form-control" onChange={this.handleEmailchange} />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
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

module.exports = Login;