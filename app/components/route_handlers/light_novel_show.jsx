var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var fluxibleAddons = require("fluxible-addons-react");

//actions
var lightNovelActions = require("../../actions/light_novel_actions");
var volumeActions = require("../../actions/volume_actions");

//stores
var lightNovelStore = require("../../stores/light_novel_store");

//components
var LightNovelItem = require("../light_novels/light_novel.jsx");
var VolumeListItem = require("../volumes/volume_list_item.jsx");

var LightNovelShow = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: lightNovelActions.find
    },
    getInitialState: function () {
        return {
            volumeNumber: null,
            volumeTitle: ""
        }
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.find, {
            params: this.props.params,
            query: this.props.query
        });
    },
    handleVolumeNumberChange: function (event) {
        if (event) {
            this.setState({
                volumeNumber: event.target.value
            });
        }
    },
    handleVolumeTitleChange: function (event) {
        if (event) {
            this.setState({
                volumeTitle: event.target.value
            });
        }
    },
    handleSubmitVolumeCreate: function () {
        this.context.executeAction(volumeActions.create, {
            params: {
                id: this.props.lightNovel._id
            },
            body: {
                volumeNum: this.state.volumeNumber,
                title: this.state.volumeTitle
            }
        });

        React.findDOMNode(this.refs.closeModalBtn).click();
    },
    render: function () {
        var lightNovel = this.props.lightNovel;
        var volumeNodes = this.props.lightNovel.volumes.map(function (volume, idx) {
            var isOpen = idx == 0;
            return (
                <VolumeListItem volume={volume} key={volume._id} isOpen={isOpen}/>
            );
        });

        var numVolumes = lightNovel.volumes.length;
        var numVolumesMeta;

        if (numVolumes > 0) {
            numVolumesMeta = (<span className="meta-text">{numVolumes} Volumes</span>);
        } else {
            numVolumesMeta = (
                <div className="no-volumes">There are currently no volumes of '{lightNovel.title}' available right now.
                    Please check back later</div>)
        }
        return (
            <div id="lightNovel" className="row">
                <div className="modal fade" id="volumeModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">
                                    Adding a new volume
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="new-volume-form row">
                                    <div className="col-xs-2 col-xs-offset-1">
                                        <div className="form-group">
                                            <label htmlFor="volNumber">Vol. #</label>
                                            <input id="volNumber" type="text" className="form-control"
                                                   onChange={this.handleVolumeNumberChange}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-8">
                                        <div className="form-group">
                                            <label htmlFor="title">Volume Title</label>
                                            <input id="title" className="form-control" type="text"
                                                   onChange={this.handleVolumeTitleChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref="closeModalBtn" className="btn btn-default"
                                        data-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary"
                                        onClick={this.handleSubmitVolumeCreate}>Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card">
                        <h1>
                            {lightNovel.title}
                            <button className="btn btn-primary pull-right" data-toggle="modal"
                                    data-target="#volumeModal">
                                Add Light Novel Volume
                            </button>
                        </h1>
                        {numVolumesMeta}
                    </div>
                    <div className="volumesList row">
                        {volumeNodes}
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="lightNovel-title">
                            {lightNovel.title}
                        </div>

                        <div className="lightNovel-author">
                            {lightNovel.author}
                        </div>

                        <div className="lightNovel-summary">
                            {lightNovel.summary}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

LightNovelShow = fluxibleAddons.connectToStores(LightNovelShow, [lightNovelStore], function (context, props) {
    return {
        lightNovel: context.getStore(lightNovelStore).getLightNovel()
    };
});

module.exports = LightNovelShow;
