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
var ChapterEdit = require("./chapter_edit.jsx");

//utils
var permissions = require("../../../../utils/user_permissions");
var imageUtils = require("../../../../utils/image_utils");

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
            newChapterWindowOpen: null,
            editChapterWindowOpen: null
        };
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.find, {
            params: this.props.params
        });
    },
    bodyModalOpen: function () {
        //need to set overflow on the body
        var bodyEl = document.getElementsByTagName("body")[0];
        bodyEl.classList.add("modal-open");
    },
    bodyModalClose: function () {
        var bodyEl = document.getElementsByTagName("body")[0];
        bodyEl.classList.remove("modal-open");
    },
    handleOpenChapterCreate: function (volume, event) {
        this.setState({
            newChapterWindowOpen: volume
        });

        this.bodyModalOpen();
    },
    handleCloseChapterCreate: function () {
        this.setState({
            newChapterWindowOpen: null
        });

        this.bodyModalClose();
    },
    handleOpenChapterEdit: function (volume, chapterNum, event) {
        this.setState({
            editChapterWindowOpen: volume,
            editChapterNum: chapterNum
        });

        this.bodyModalOpen();
    },
    handleCloseChapterEdit: function () {
        this.setState({
            editChapterWindowOpen: null
        });

        this.bodyModalClose();
    },
    render: function () {
        var self = this;
        var lightNovel = this.props.lightNovel;
        var user = this.props.user;

        var numberOfVolumes = lightNovel.volumes.length;
        var volumeNumsNode = "";
        if (numberOfVolumes > 1) {
            volumeNumsNode = <div className="small">({numberOfVolumes} Volumes)</div>;
        } else if (numberOfVolumes == 1) {
            volumeNumsNode = <div className="small">({numberOfVolumes} Volume)</div>;
        }

        return (
            <div>
                { self.state.newChapterWindowOpen ?
                    <ChapterNew {...self.props} handleCloseChapterCreate={self.handleCloseChapterCreate}
                                                volume={self.state.newChapterWindowOpen }/> : "" }
                { self.state.editChapterWindowOpen ?
                    <ChapterEdit {...self.props} handleCloseChapterEdit={self.handleCloseChapterEdit}
                                                 chapterNum={self.state.editChapterNum}
                                                 volume={self.state.editChapterWindowOpen }/> : ""}
                <div id="lightNovel" className="row">
                    <div className="col-sm-9">
                        <LightNovelHeader {...this.props} />
                        { permissions.canCreate(user) ? <VolumeListNewItem {...this.props} /> : "" }
                        <VolumesList {...this.props} handleOpenChapterCreate={this.handleOpenChapterCreate}
                                                     handleOpenChapterEdit={this.handleOpenChapterEdit}/>
                    </div>

                    <div className="col-sm-3">
                        <div className="card">
                            <div className="img-wrapper">
                                <img
                                    src={imageUtils.getImageUrl(lightNovel.imageId, lightNovel.imageFormat, 190, 262)}/>
                            </div>
                            <div className="text-center mbm">
                                {volumeNumsNode ? volumeNumsNode : ""}
                            </div>
                            <div className="text-center lightNovel-title">
                                <strong className=" bold-text">
                                    {lightNovel.title}
                                </strong>
                            </div>

                            <div className="lightNovel-author text-center">
                                By: {lightNovel.author}
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
