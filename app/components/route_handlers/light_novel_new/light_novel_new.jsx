var React = require("react");
var Router = require("react-router");
var History = Router.History;
var fluxibleAddons = require("fluxible-addons-react");

//stores
var lightNovelStore = require("../../../stores/light_novel_store");
var authenticationStore = require("../../../stores/authentication_store");

//actions
var lightNovelActions = require("../../../actions/light_novel_actions");

var LightNovelNew = React.createClass({
    mixins: [History],
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            title: "",
            author: "",
            summary: "",
            image: ""
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
    handleSuccessfulLightNovelCreate: function (lightNovelId) {
        this.history.replaceState(null, "/lightNovels/" + lightNovelId);
    },
    handleSubmit: function () {
        this.context.executeAction(lightNovelActions.create, {
            params: {},
            body: this.state,
            component: this
        });
    },
    handleFileChange: function (event) {
        var file = event.target.files[0];
        var self = this;

        if (file) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                var contents = e.target.result;
                self.setState({
                    image: btoa(contents)
                });
            };
            fileReader.readAsBinaryString(file);
        }
    },
    render: function () {
        var error = this.props.error;

        return (
            <div className="row">
                <form id="lightNovelNew" action="javascript:void(0);" className="col-xs-12">
                    <div className="card">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <h3>New Light Novel</h3>
                            </div>
                            <div className="col-sm-6">
                                { error ? <div className="alert-danger alert">{error.message}</div> : "" }
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title"
                                           onChange={this.handleTitleFieldChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">Author</label>
                                    <input type="text" className="form-control" id="author"
                                           onChange={this.handleAuthorFieldChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="summary">Synopsis</label>
                        <textarea className="form-control" onChange={this.handleSummaryFieldChange} id="summary"
                                  rows="10"></textarea>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Tags</label>
                                    <input type="text" className="form-control" placeholder="Optional Tags"/>
                                </div>
                                <div className="form-group">
                                    <label>Cover Image</label>
                                    <input type="file" onChange={this.handleFileChange}/>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <input type="button" className="btn btn-block btn-primary" onClick={this.handleSubmit}
                                       value="Create"/>
                            </div>
                        </div>
                    </div>
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