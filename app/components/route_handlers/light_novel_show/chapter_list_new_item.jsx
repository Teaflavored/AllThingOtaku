var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;
var Link = Router.Link;

//actions
var chapterActions = require("../../../actions/chapter_actions");

var ChapterListNewItem = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <div>
                <span className="fa fa-plus" onClick={this.props.handleOpenChapterCreate.bind(null, this.props.volume)}></span>
            </div>
        );
    }
});

module.exports = ChapterListNewItem;
