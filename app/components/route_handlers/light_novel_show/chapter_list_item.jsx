var React = require("react");

//actions
var chapterAction = require("../../../actions/chapter_actions");

var ChapterListItem = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    loadAndShowChapter: function (event) {
        this.context.executeAction(chapterAction.find, {
            params: {
                lightNovelId : this.props.lightNovelId,
                volumeId: this.props.volumeId,
                chapterId: this.props.chapter._id
            }
        });
    },
    render: function () {
        return (
            <div>
                <a href="javascript:void(0);" onClick={this.loadAndShowChapter}>Chapter {this.props.chapter.chapterNum}</a>
                <p dangerouslySetInnerHTML={{__html: this.props.chapter.chapterText }}></p>
            </div>
        );
    }
});

module.exports = ChapterListItem;