var React = require("react");

var ChapterListItem = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.chapter.chapterName}
            </div>
        );
    }
});

module.exports = ChapterListItem;