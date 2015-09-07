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
var VolumesList = require("./volumes_list.jsx");
var VolumeListNewItem = require("./volume_list_new_item.jsx");
var LightNovelHeader = require("./light_novel_header.jsx");

var LightNovelShow = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: lightNovelActions.find
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.find, {
            params: this.props.params,
            query: this.props.query
        });
    },
    render: function () {
        var lightNovel = this.props.lightNovel;
        var isLoggedIn = this.props.isLoggedIn;

        return (
            <div id="lightNovel" className="row">
                <div className="col-sm-8">
                    <LightNovelHeader title={lightNovel.title} numVolumes={lightNovel.volumes.length}/>
                    { isLoggedIn ? <VolumeListNewItem lightNovelId={lightNovel._id}/> : "" }
                    <VolumesList volumes={lightNovel.volumes} lightNovelId={lightNovel._id} isLoggedIn={isLoggedIn}/>
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
