var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var fluxibleAddons = require("fluxible-addons-react");

//actions
var lightNovelActions = require("../../../actions/light_novel_actions");
var volumeActions = require("../../../actions/volume_actions");

//stores
var lightNovelStore = require("../../../stores/light_novel_store");
var authenticationStore = require("../../../stores/authentication_store");

//components
var VolumeListItem = require("./volume_list_item.jsx");
var VolumeListNewItem = require("./volume_list_new_item.jsx");

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
            listItemOpenStates: {}
        };
    },
    componentWillReceiveProps: function (nextProps) {
        var volumes = nextProps.lightNovel.volumes;
        var listItemOpenStates = {};

        for (var i = 0; i < volumes.length; i++) {
            listItemOpenStates[volumes[i]._id] = false;
        }

        this.setState({
            listItemOpenStates: listItemOpenStates
        });
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.find, {
            params: this.props.params,
            query: this.props.query
        });
    },
    handleOpenVolumeItem: function (event) {
        var volumeId = event.currentTarget.dataset.id,
            isOpen,
            newListItemOpenStates = {};

        var handleAnimation = function () {
            for (var id in this.state.listItemOpenStates) {
                isOpen = this.state.listItemOpenStates[id];

                if (volumeId == id) {
                    newListItemOpenStates[id] = !isOpen;
                } else {
                    newListItemOpenStates[id] = false;
                }
            }

            this.setState({
                listItemOpenStates: newListItemOpenStates
            });

        }.bind(this);

        handleAnimation();
    },
    render: function () {
        var lightNovel = this.props.lightNovel;
        var isLoggedIn = this.props.isLoggedIn;
        var listItemOpenStates = this.state.listItemOpenStates;
        var handleVolumeItemOpen = this.handleOpenVolumeItem;

        var volumeNodes = this.props.lightNovel.volumes.map(function (volume) {
            var isOpen = listItemOpenStates[volume._id];
            return (
                <VolumeListItem lightNovelId={lightNovel._id} volumeId={volume._id} volume={volume}
                                isLoggedIn={isLoggedIn} key={volume._id}
                                isOpen={isOpen} onClick={handleVolumeItemOpen}/>
            );
        });

        return (
            <div id="lightNovel" className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <h1>
                            {lightNovel.title}
                        </h1>
                        {
                            (function () {
                                var numVolumes = lightNovel.volumes.length;
                                if (numVolumes > 0) {
                                    return <span className="meta-text">{numVolumes} Volumes</span>;
                                }

                                return (
                                    <div className="no-volumes">There are currently no volumes of '{lightNovel.title}'
                                        available right now.
                                        Please check back later</div>
                                );
                            })()
                        }

                    </div>
                    {(function () {
                        if (isLoggedIn) {
                            return <VolumeListNewItem lightNovelId={lightNovel._id}/>
                        }
                    })()}
                    <div className="volumes-list row">
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
