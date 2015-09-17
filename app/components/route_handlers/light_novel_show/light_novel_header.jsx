var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var permission = require("../../../../utils/user_permissions");

var VolumeMetaInfo = React.createClass({
    mixins: [History],
    handleGoToEdit: function () {
        this.history.replaceState(null, "/lightNovels/" + this.props.lightNovel._id + "/edit");
    },
    render: function () {
        var summary = this.props.lightNovel.summary;
        var title = this.props.lightNovel.title;
        return (
            <div className="card">
                {
                    permission.canEdit(this.props.user) ?
                        <a href="javascript:void(0);" onClick={this.handleGoToEdit}>
                            <i className="fa fa-pencil fa-lg pull-right"></i>
                        </a> : ""
                }
                <h1>{title}</h1>
                { summary ?
                    <div>
                        <strong>Synopsis</strong>
                        <div className="summary">{summary}</div>
                    </div> : ""}
            </div>
        );
    }
});

module.exports = VolumeMetaInfo;