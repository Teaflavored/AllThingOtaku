var React = require("react");
var ReactRouter = require("react-router");
var classnames = require("classnames");
var History = ReactRouter.History;

var permission = require("../../../../utils/user_permissions");

var VolumeMetaInfo = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            hasReadMore: false,
            readMoreOpened: false,
            height: null
        };
    },
    componentDidMount: function () {
        var summaryRef = this.refs.summary,
            summaryNode;

        if (summaryRef) {
            summaryNode = summaryRef.getDOMNode();
            var fullHeight = summaryNode.scrollHeight;
            var innerHeight = summaryNode.clientHeight;

            var newState = {
                defaultHeight: innerHeight
            };

            if (fullHeight > innerHeight) {
                newState = React.__spread({}, newState, { hasReadMore: true} );
            }

            this.setState(newState);
        }
    },
    handleShowMore: function () {
        var summaryRef = this.refs.summary,
            summaryNode;

        if (summaryRef) {
            summaryNode = summaryRef.getDOMNode();
            var fullHeight = summaryNode.scrollHeight;

            if (this.state.readMoreOpened) {
                this.setState({
                    readMoreOpened: false
                });
            } else {
                this.setState({
                    readMoreOpened: true,
                    height: fullHeight
                })
            }
        }
    },
    handleGoToEdit: function () {
        this.history.replaceState(null, "/lightNovels/" + this.props.lightNovel._id + "/edit");
    },
    render: function () {
        var summary = this.props.lightNovel.summary;
        var title = this.props.lightNovel.title;
        var iconClass = classnames("fa", {
            "fa-angle-right" : !this.state.readMoreOpened,
            "fa-angle-up" : this.state.readMoreOpened
        });

        var summaryStyle;

        if (this.state.readMoreOpened) {
            summaryStyle = headerCSS.summaryOpenCSS(this.state.height);
        } else {
            summaryStyle = headerCSS.summaryCSS
        }

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

                        <div className="summary-container">
                            <div ref="summary" className="summary" style={summaryStyle}>
                                {summary}
                            </div>
                            {
                                this.state.hasReadMore ? <a href="javascript:void(0);" onClick={this.handleShowMore} >Read More <i className={iconClass}></i></a> : ""
                            }
                        </div>
                    </div> : ""}
            </div>
        );
    }
});

var headerCSS = {
    summaryCSS: {
        "maxHeight": 135,
        "overflow": "hidden",
        "transition" : "max-height 0.3s ease"
    },
    summaryOpenCSS: function (height) {
        return {
            "maxHeight" : height,
            "overflow" : "hidden",
            "transition" : "max-height 0.3s ease"
        }
    }
};

module.exports = VolumeMetaInfo;