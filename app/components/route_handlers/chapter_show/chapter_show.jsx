var React = require("react");
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
                        <div className="card"
                             dangerouslySetInnerHTML={ { __html: this.props.chapter.chapterText} }>
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
        chapter: context.getStore(chapterStore).getChapter(props.params.chapterId)
    };
});
module.exports = ChapterShow;