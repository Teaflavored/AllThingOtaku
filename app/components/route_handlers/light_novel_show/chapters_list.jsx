var React = require("react");

//components
var ChapterListItem = require("./chapter_list_item.jsx");
var ChapterListNewItem = require("./chapter_list_new_item.jsx");

var ChaptersList = React.createClass({
    render: function () {
        var chaptersNodes = this.props.chapters.map(function (chapter) {
            return (<ChapterListItem key={chapter._id}/>);
        });

        var isLoggedIn = this.props.isLoggedIn;

        return (
            <div className="chapters-list">
                {
                    (function () {
                        if (isLoggedIn) {
                            return (
                                <ChapterListNewItem />
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