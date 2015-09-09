var React = require("react");

//components
var ChapterListItem = require("./chapter_list_item.jsx");
var ChapterListNewItem = require("./chapter_list_new_item.jsx");

var ChaptersList = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        var self = this;

        var chaptersNodes = this.props.volume.chapters.map(function (chapter) {
            return (<ChapterListItem {...self.props} key={chapter._id} chapter={chapter} />);
        });

        if (chaptersNodes.length == 0) {
            chaptersNodes = (
                <div className="no-chapters">There are no chapters currently, Please check back later.</div>
            );
        }

        var isLoggedIn = this.props.isLoggedIn;

        return (
            <div className="chapters-list">
                {
                    (function () {
                        if (isLoggedIn) {
                            return (
                                <ChapterListNewItem {...self.props} />
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