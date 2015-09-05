var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var fluxibleAddons = require("fluxible-addons-react");

//actions
var lightNovelActions = require("../../actions/light_novel_actions");
var volumeActions = require("../../actions/volume_actions");

//stores
var lightNovelStore = require("../../stores/light_novel_store");
var authenticationStore = require("../../stores/authentication_store");

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
            volumeTitle: ""
        }
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.find, {
            params: this.props.params,
            query: this.props.query
        });
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
                title: this.state.volumeTitle
            }
        });

        this.setState({
            volumeTitle: ""
        });
    },
    render: function () {
        var self = this;
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

        var isLoggedIn = this.props.isLoggedIn;

        return (
            <div id="lightNovel" className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <h1>
                            {lightNovel.title}
                        </h1>
                        {numVolumesMeta}
                    </div>
                    {(function () {
                        if (isLoggedIn) {
                            return (
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <form className="row" onSubmit={self.handleSubmitVolumeCreate}
                                                  action="javascript:void(0);">
                                                <div className="col-xs-8">
                                                    <input className="form-control"
                                                           onChange={self.handleVolumeTitleChange}
                                                           value={self.state.volumeTitle} type="text"
                                                           autoComplete="off"/>
                                                </div>
                                                <div className="col-xs-4">
                                                    <button className="btn-block btn-primary btn">
                                                        Create New Volume
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })()}
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

LightNovelShow = fluxibleAddons.connectToStores(LightNovelShow, [lightNovelStore, authenticationStore], function (context, props) {
    return {
        lightNovel: context.getStore(lightNovelStore).getLightNovel(),
        isLoggedIn: context.getStore(authenticationStore).isLoggedIn()
    };
});

module.exports = LightNovelShow;
