var React = require("react");

var VolumeMetaInfo = React.createClass({
    render: function () {
        var numVolumes = this.props.lightNovel.volumes.length,
            numVolumesMeta;

        if (numVolumes > 0) {
            numVolumesMeta = <span className="meta-text">{numVolumes} Volumes</span>;
        } else {
            numVolumeMeta = <div className="no-volumes">There are currently no volumes of '{this.props.lightNovel.title}'
                available right now.
                Please check back later</div>;
        }

        return (
            <div className="card">
                <h1>
                    {this.props.lightNovel.title}
                </h1>
                {numVolumesMeta}
            </div>
        );
    }
});

module.exports = VolumeMetaInfo;