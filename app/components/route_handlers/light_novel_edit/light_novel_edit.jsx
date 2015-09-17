var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var fluxibleAddons = require("fluxible-addons-react");

//stores
var lightNovelEditStore = require("../../../stores/light_novel_edit_store");

//actions
var lightNovelActions = require("../../../actions/light_novel_actions");

var LightNovelEdit = React.createClass({
    mixins: [History],
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: lightNovelActions.findEdit
    },
    getInitialState: function () {
        return {
            title: "",
            author: "",
            summary: "",
            image: ""
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.lightNovel) {
            this.setState({
                title: nextProps.lightNovel.title,
                author: nextProps.lightNovel.author,
                summary: nextProps.lightNovel.summary
            });
        }
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.findEdit, {
            params: {
                lightNovelId: this.props.params.lightNovelId
            }
        });
    },
    handleSuccessfulUpdate: function (lightNovelId) {
        this.history.replaceState(null, "/lightNovels/" + lightNovelId);
    },
    handleTitleFieldChange: function (e) {
        this.setState({
            title: e.target.value
        });
    },
    handleAuthorFieldChange: function (e) {
        this.setState({
            author: e.target.value
        });
    },
    handleSummaryFieldChange: function (event) {
        this.setState({
            summary: event.target.value
        });
    },
    handleImageChange: function (e) {
        var file = e.target.files[0];
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
    handleUpdate: function () {

        var body = {
            author: this.state.author,
            title: this.state.title,
            summary: this.state.summary
        };

        if (this.state.image) {
            body = React.__spread({}, body, {image: this.state.image});
        }

        var params = {
            lightNovelId: this.props.params.lightNovelId,
        };

        this.context.executeAction(lightNovelActions.update, {
            params: params,
            body: body,
            component: this
        });
    },
    render: function () {
        return (
            <div className="row">
                <form id="lightNovelNew" action="javascript:void(0);" className="col-xs-12">
                    <div className="card">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <h3>New Light Novel</h3>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" value={this.state.title}
                                           onChange={this.handleTitleFieldChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">Author</label>
                                    <input type="text" className="form-control" id="author" value={this.state.author}
                                           onChange={this.handleAuthorFieldChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="summary">Synopsis</label>
                        <textarea className="form-control" onChange={this.handleSummaryFieldChange} id="summary"
                                  rows="10" value={this.state.summary}></textarea>
                                </div>
                                <input type="button" className="btn btn-block btn-primary" onClick={this.handleUpdate}
                                       value="Update"/>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Tags</label>
                                    <input type="text" className="form-control" placeholder="Optional Tags"/>
                                </div>
                                <div className="form-group">
                                    <label>Cover Image</label>
                                    <input type="file" onChange={this.handleImageChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

LightNovelEdit = fluxibleAddons.connectToStores(LightNovelEdit, [lightNovelEditStore], function (context, props) {
    return {
        lightNovel: context.getStore(lightNovelEditStore).getLightNovel()
    };
});

module.exports = LightNovelEdit;