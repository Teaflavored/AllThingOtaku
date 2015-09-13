var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

//actions
var chapterAction = require("../../../actions/chapter_actions");

var ChapterListItem = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div>
                <Link to="chapterShow" params={ {
                    lightNovelId: this.props.lightNovel._id,
                    volumeNum: this.props.volume.volumeNum,
                    chapterNum: this.props.chapter.chapterNum
                } }>
                    Chapter {this.props.chapter.chapterNum}
                </Link>

                <p dangerouslySetInnerHTML={{__html: this.props.chapter.chapterText }}></p>
            </div>
        );
    }
});

module.exports = ChapterListItem;