var React = require("react");
var getLightNovel = require("../../actions/find_light_novel");
var LightNovelItem = require("../light_novels/light_novel.jsx");
var lightNovelStore = require("../../stores/light_novel_store");
var fluxibleAddons = require("fluxible-addons-react");

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

        return (
            <div id="lightNovel">
                <div className="lightNovel-title">
                    {lightNovel.title}
                </div>
                <div className="lightNovel-author">
                    {lightNovel.author}
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
