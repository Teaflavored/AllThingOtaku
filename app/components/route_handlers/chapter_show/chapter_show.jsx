var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var fluxibleAddons = require("fluxible-addons-react");

//actions
var chapterActions = require("../../../actions/chapter_actions");

//stores
var chapterStore = require("../../../stores/chapter_store");


var ChapterShow = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: chapterActions.find
    },
    componentDidMount: function () {
        this.context.executeAction(chapterActions.find, {
            params: {
                lightNovelId: this.props.params.lightNovelId,
                volumeId: this.props.params.volumeId,
                chapterId: this.props.params.chapterId
            }
        });
    },
    render: function () {
        return (
            <div id="chapterShow">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <Link className="small" to="lightNovelShow"
                                  params={ { lightNovelId: this.props.params.lightNovelId} }>Back
                                to {this.props.lightNovel.title}</Link>

                            <div className="text-center">
                                <h3>{this.props.lightNovel.title}</h3>
                                <h5>Volume {this.props.volume.volumeNum},
                                    Chapter {this.props.chapter.chapterNum}</h5>
                            </div>
                            <div dangerouslySetInnerHTML={ { __html: this.props.chapter.chapterText} }></div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ChapterShow = fluxibleAddons.connectToStores(ChapterShow, [chapterStore], function (context, props) {
    return {
        volume: context.getStore(chapterStore).getVolume(props.params.volumeId),
        chapter: context.getStore(chapterStore).getChapter(props.params.chapterId),
        lightNovel: context.getStore(chapterStore).getLightNovel(props.params.lightNovelId)
    };
});
module.exports = ChapterShow;