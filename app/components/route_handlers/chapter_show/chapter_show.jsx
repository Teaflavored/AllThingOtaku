var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var fluxibleAddons = require("fluxible-addons-react");

//actions
var chapterActions = require("../../../actions/chapter_actions");

//stores
var chapterStore = require("../../../stores/chapter_store");

//components
var ChapterShowRight = require("./chapter_show_right.jsx");

var ChapterShow = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: chapterActions.find
    },
    getChapterData: function (chapterNum){
        this.context.executeAction(chapterActions.find, {
            params: {
                lightNovelId: this.props.params.lightNovelId,
                volumeNum: this.props.params.volumeNum,
                chapterNum: chapterNum
            }
        });
    },
    componentWillUnmount: function () {

    },
    componentDidUpdate: function () {
        //loading
    },
    componentWillMount: function () {
        this.getChapterData(this.props.params.chapterNum);
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.params.chapterNum != this.props.params.chapterNum) {
            this.getChapterData(nextProps.params.chapterNum);
        }
    },
    render: function () {
        var url = "/lightNovels/" + this.props.params.lightNovelId;

        return (
            <div id="chapterShow">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <Link className="small" to={url}>
                                Back to {this.props.lightNovel.title} <i className="fa fa-undo"></i>
                            </Link>

                            <div className="text-center chapter-show-header mbm">
                                <h3>{this.props.lightNovel.title}</h3>
                                <h5>Volume {this.props.volume.volumeNum},
                                    Chapter {this.props.chapter.chapterNum}</h5>
                            </div>
                            <div dangerouslySetInnerHTML={ { __html: this.props.chapter.chapterText} }></div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <ChapterShowRight {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
});

ChapterShow = fluxibleAddons.connectToStores(ChapterShow, [chapterStore], function (context, props) {
    return {
        volume: context.getStore(chapterStore).getVolume(props.params.lightNovelId),
        chapter: context.getStore(chapterStore).getChapter(props.params.lightNovelId),
        lightNovel: context.getStore(chapterStore).getLightNovel(props.params.lightNovelId)
    };
});
module.exports = ChapterShow;