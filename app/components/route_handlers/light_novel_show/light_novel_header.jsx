var React = require("react");

var VolumeMetaInfo = React.createClass({
    render: function () {
        var numVolumes = this.props.numVolumes,
            numVolumesMeta;

        if (numVolumes > 0) {
            numVolumesMeta = <span className="meta-text">{numVolumes} Volumes</span>;
        } else {
            numVolumeMeta = <div className="no-volumes">There are currently no volumes of '{this.props.title}'
                available right now.
                Please check back later</div>;
        }

        return (
            <div className="card">
                <h1>
                    {this.props.title}
                </h1>
                {numVolumesMeta}
            </div>
        );
    }
});

module.exports = VolumeMetaInfo;