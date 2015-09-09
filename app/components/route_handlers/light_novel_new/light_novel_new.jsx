var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;
var fluxibleAddons = require("fluxible-addons-react");

//stores
var lightNovelStore = require("../../../stores/light_novel_store");
var authenticationStore = require("../../../stores/authentication_store");

//actions
var lightNovelActions = require("../../../actions/light_novel_actions");

var LightNovelNew = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
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
        var error = this.props.error;

        return (
            <div className="row">
                <form id="lightNovelNew" action="javascript:void(0);" className="col-sm-4">
                    {
                        (function () {
                            if (error) {
                                return <div className="alert-danger alert">{error.message}</div>;
                            }
                        })()
                    }
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
        user: context.getStore(authenticationStore).getUser()
    };
});
module.exports = LightNovelNew;