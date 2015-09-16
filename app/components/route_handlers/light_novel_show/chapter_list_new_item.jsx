var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

//actions
var chapterActions = require("../../../actions/chapter_actions");

var ChapterListNewItem = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div>
                <a href="javascript:void(0);" className="block-link mts mbm"
                   onClick={this.props.handleOpenChapterCreate.bind(null, this.props.volume)}>
                    <span className="fa fa-plus"></span> Create Chapter
                </a>
            </div>
        );
    }
});

module.exports = ChapterListNewItem;
