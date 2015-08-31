var React = require("react");
var fluxibleAddons = require("fluxible-addons-react");

//actions
var getLightNovel = require("../../actions/find_light_novel");

//stores
var lightNovelStore = require("../../stores/light_novel_store");

//components
var LightNovelItem = require("../light_novels/light_novel.jsx");


var LightNovelShow = React.createClass({
    getDefaultProps: function () {
        return {
            lightNovel: {}
        };
    },
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: getLightNovel
    },
    componentDidMount: function () {
        this.context.executeAction(getLightNovel, {
            params: this.props.params,
            query: this.props.query
        });
    },
    render: function () {
        var lightNovel = this.props.lightNovel;
        var numVolumes = lightNovel.volumes.length;
        var numVolumesMeta;

        if (numVolumes > 0) {
            numVolumesMeta = (<span className="meta-text">{numVolumes} Volumes</span>);
        } else {
            numVolumesMeta = (<div className="no-volumes">There are currently no volumes of '{lightNovel.title}' available right now. Please check back later</div>)
        }
        return (
            <div id="lightNovel" className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <h1>{lightNovel.title}</h1>
                        {numVolumesMeta}
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="lightNovel-title">
                            {lightNovel.title}
                        </div>

                        <div className="lightNovel-author">
                            {lightNovel.author}
                        </div>

                        <div className="lightNovel-summary">
                            {lightNovel.summary}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

LightNovelShow = fluxibleAddons.connectToStores(LightNovelShow, [lightNovelStore], function (context, props) {
    return {
        lightNovel: context.getStore(lightNovelStore).getLightNovel()
    }
});

module.exports = LightNovelShow;
