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
var ChapterNew = require("./chapter_new.jsx");

//utils
var permissions = require("../../../../utils/user_permissions");

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
            newChapterWindowOpen: null
        };
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.find, {
            params: this.props.params
        });
    },
    handleOpenChapterCreate: function (volume, event) {
        this.setState({
            newChapterWindowOpen: volume
        });
    },
    handleCloseChapterCreate: function () {
        this.setState({
            newChapterWindowOpen: null
        });
    },
    render: function () {
        var self = this;
        var lightNovel = this.props.lightNovel;
        var user = this.props.user;

        return (
            <div>
                {
                    (function () {
                        if (self.state.newChapterWindowOpen) {
                            return (
                                <ChapterNew {...self.props} handleCloseChapterCreate={self.handleCloseChapterCreate}
                                                            volume={self.state.newChapterWindowOpen}/>
                            );
                        }
                    })()
                }
                <div id="lightNovel" className="row">

                    <div className="col-sm-8">
                        <LightNovelHeader {...this.props} />

                        { permissions.canCreate(user) ? <VolumeListNewItem {...this.props} /> : "" }

                        <VolumesList {...this.props} handleOpenChapterCreate={this.handleOpenChapterCreate}/>

                    </div>

                    <div className="col-sm-4">
                        <div className="card">
                            <div className="text-center lightNovel-title">
                                <strong className=" bold-text">
                                    {lightNovel.title}
                                </strong>
                            </div>

                            <div className="lightNovel-author text-center">
                                By: {lightNovel.author}
                            </div>

                            <div className="lightNovel-summary mtl">
                                {lightNovel.summary}
                            </div>
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
        user: context.getStore(authenticationStore).getUser()
    };
});

module.exports = LightNovelShow;
