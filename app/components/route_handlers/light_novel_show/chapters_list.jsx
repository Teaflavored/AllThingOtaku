var React = require("react");

//components
var ChapterListItem = require("./chapter_list_item.jsx");
var ChapterListNewItem = require("./chapter_list_new_item.jsx");

//utils
var permission = require("../../../../utils/user_permissions");

var ChaptersList = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        var user = this.props.user;

        var chaptersNodes = this.props.volume.chapters.map(function (chapter, idx) {
            return (<ChapterListItem {...this.props} key={idx} chapter={chapter} />);
        }.bind(this));

        if (chaptersNodes.length == 0) {
            chaptersNodes = (
                <div className="no-chapters">There are no chapters currently, Please check back later.</div>
            );
        }

        return (
            <div className="chapters-list">
                { permission.canCreate(user) ? (<ChapterListNewItem {...this.props} />) : "" }
                {chaptersNodes}
            </div>
        );
    }
});

module.exports = ChaptersList;