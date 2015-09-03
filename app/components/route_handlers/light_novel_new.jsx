var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;

//fluxible helpers
var fluxibleAddons = require("fluxible-addons-react");
//stores
var lightNovelStore = require("../../stores/light_novel_store");
var authenticationStore = require("../../stores/authentication_store");
//actions
var lightNovelActions = require("../../actions/light_novel_actions");

var LightNovelNew = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getDefaultProps: function () {
        return {
            error: null,
            isLoggedIn: false
        }
    },
    getInitialState: function () {
        return {
            title: "",
            author: "",
            summary: ""
        };
    },
    handleTitleFieldChange: function (event) {
        this.setState(
            {
                title: event.target.value
            }
        )
    },
    handleAuthorFieldChange: function (event) {
        this.setState(
            {
                author: event.target.value
            }
        )
    },
    handleSummaryFieldChange: function (event) {
        this.setState(
            {
                summary: event.target.value
            }
        );
    },
    handleSubmit: function () {
        this.context.executeAction(lightNovelActions.create, {
            params: {},
            body: this.state,
            component: this
        });
    },
    render: function () {
        var errorNode;
        var error = this.props.error;
        if (error) {
            errorNode = <div className="alert-danger alert">{error.message}</div>;
        } else {
            errorNode = "";
        }
        return (
            <div className="row">
                <form id="lightNovelNew" action="javascript:void(0);" className="col-sm-4">
                    {errorNode}
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" onChange={this.handleTitleFieldChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author"
                               onChange={this.handleAuthorFieldChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="summary">Summary</label>
                        <textarea className="form-control" onChange={this.handleSummaryFieldChange} id="summary"
                                  rows="10"></textarea>
                    </div>
                    <input type="button" className="btn btn-primary" onClick={this.handleSubmit} value="Create"/>
                </form>
            </div>
        );
    }
});

LightNovelNew = fluxibleAddons.connectToStores(LightNovelNew, [lightNovelStore, authenticationStore], function (context, props) {
    return {
        error: context.getStore(lightNovelStore).getNewLightNovelErr(),
        isLoggedIn: context.getStore(authenticationStore).isLoggedIn()
    };
});
module.exports = LightNovelNew;