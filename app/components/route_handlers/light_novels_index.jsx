var React = require("react");
var Link = require("react-router").Link;
var fluxibleAddons = require("fluxible-addons-react");

//stores
var lightNovelStore = require("../../stores/light_novel_store");
var authenticationStore = require("../../stores/authentication_store");

//actions
var lightNovelActions = require("../../actions/light_novel_actions");

//components & css
var LightNovel = require("../light_novels/light_novel_list_item.jsx");

var LightNovelsIndex = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: lightNovelActions.index
    },
    getDefaultProps: function () {
        return {
            lightNovels: [],
            isLoggedIn: false
        };
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.index);
    },
    render: function () {
        var isLoggedIn = this.props.isLoggedIn;

        var lightNovels = this.props.lightNovels; lightNovelNodes = lightNovels.map(function (lightNovel) {
            return (
                <LightNovel lightNovel={ lightNovel  } key={lightNovel._id}/>
            );
        });

        return (
            <div id="lightNovels">
                {
                    (function() {
                        if (isLoggedIn) {
                            return (
                                <Link to="lightNovelCreate">
                                    Create New
                                </Link>
                            );
                        }
                    })()
                }

                <div id="lightNovelList" className="row">
                    {lightNovelNodes}
                </div>
            </div>
        );
    }
});

LightNovelsIndex = fluxibleAddons.connectToStores(LightNovelsIndex, [lightNovelStore, authenticationStore], function (context, props) {
    return {
        lightNovels: context.getStore(lightNovelStore).getLightNovels(),
        isLoggedIn: context.getStore(authenticationStore).isLoggedIn()
    };
});
module.exports = LightNovelsIndex;
