var React = require("react");

//components
var ChapterListItem = require("./chapter_list_item.jsx");
var ChapterListNewItem = require("./chapter_list_new_item.jsx");

var ChaptersList = React.createClass({
    render: function () {
        var lightNovelId = this.props.lightNovelId;
        var volumeId = this.props.volumeId;

        var chaptersNodes = this.props.chapters.map(function (chapter) {
            return (<ChapterListItem key={chapter._id} lightNovelId={lightNovelId} chapter={chapter} />);
        });

        var isLoggedIn = this.props.isLoggedIn;

        return (
            <div className="chapters-list">
                {
                    (function () {
                        if (isLoggedIn) {
                            return (
                                <ChapterListNewItem lightNovelId={lightNovelId} volumeId={volumeId} />
                            );
                        }
                    })()
                }
                {chaptersNodes}
            </div>
        );
    }
});

module.exports = ChaptersList;