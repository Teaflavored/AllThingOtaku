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
                    volumeId: this.props.volume._id,
                    chapterId: this.props.chapter._id
                } }>
                    Chapter {this.props.chapter.chapterNum}
                </Link>

                <p dangerouslySetInnerHTML={{__html: this.props.chapter.chapterText }}></p>
            </div>
        );
    }
});

module.exports = ChapterListItem;