var React = require("react");
var ChapterListItem = require("./chapter_list_item.jsx");

var ChaptersList = React.createClass({
    getDefaultProps: function () {
        return {
            chapters: []
        };
    },
    render: function () {
        var chaptersNodes = this.props.chapters.map(function (chapter) {
            return (<ChapterListItem key={chapter._id}/>);
        });
        return (
            <div className="chapters-list">
                {chaptersNodes}
            </div>
        );
    }
});

module.exports = ChaptersList;