var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

//actions
var chapterAction = require("../../../actions/chapter_actions");

//utils
var permissions = require("../../../../utils/user_permissions");

var ChapterListItem = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        var url = "/lightNovels/" + this.props.lightNovel._id + "/volume/" + this.props.volume.volumeNum + "/chapter/" + this.props.chapter.chapterNum;
        return (
            <div className="mbm">
                <Link to={url}>Chapter {this.props.chapter.chapterNum}</Link>
                { permissions.canEdit(this.props.user) ?
                    <a className="mlxl" href="javascript:void(0);"
                       onClick={this.props.handleOpenChapterEdit.bind(null, this.props.volume, this.props.chapter.chapterNum)}>Edit
                        <span className="fa fa-pencil-square-o"></span></a>
                    : ""
                }
            </div>
        );
    }
});

module.exports = ChapterListItem;