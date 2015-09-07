var React = require("react");

var ChapterListItem = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.chapter.chapterName}
                <p dangerouslySetInnerHTML={{__html: this.props.chapter.chapterText }}></p>
            </div>
        );
    }
});

module.exports = ChapterListItem;