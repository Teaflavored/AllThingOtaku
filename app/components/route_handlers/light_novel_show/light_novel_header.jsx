var React = require("react");

var VolumeMetaInfo = React.createClass({
    render: function () {
        var summary = this.props.lightNovel.summary;
        var title = this.props.lightNovel.title;
        return (
            <div className="card">
                <h1>{title}</h1>
                {(function () {
                        if (summary) {
                            return (
                                <div>
                                    <strong>Synopsis</strong>
                                    <div className="summary">{summary}</div>
                                </div>
                            );
                        }
                    })()
                }
            </div>
        );
    }
});

module.exports = VolumeMetaInfo;