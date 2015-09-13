var React = require("react");

var VolumeMetaInfo = React.createClass({
    render: function () {
        return (
            <div className="card">
                <h1>
                    {this.props.lightNovel.title}
                </h1>
                <strong>Synopsis</strong>
                <div className="summary">{this.props.lightNovel.summary}</div>
            </div>
        );
    }
});

module.exports = VolumeMetaInfo;