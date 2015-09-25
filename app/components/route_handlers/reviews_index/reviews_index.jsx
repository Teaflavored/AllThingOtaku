var React = require("react");
var fluxibleAddons = require("fluxible-addons-react");

//stores
var reviewStore = require("../../../stores/review_store");

//actions
var reviewActions = require("../../../actions/review_actions");

//components
var ReviewIndexItem = require("./review_index_item.jsx");
var ReviewIndexRight = require("./review_index_right.jsx");

//utils
var permission = require("../../../../utils/user_permissions");

var ReviewsIndex = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: reviewActions.index
    },
    componentDidMount: function () {
        this.context.executeAction(reviewActions.index, {
            params: {}
        });
    },
    render: function () {
        var reviewNodes = this.props.reviews.map(function (review) {
            return (
                <ReviewIndexItem {...this.props} review={review} key={review._id}/>
            );
        }.bind(this));

        return (
            <div className="row">
                <div className="col-xs-12">

                </div>
                <div className="col-sm-9">
                    { reviewNodes }
                </div>

                <div className="col-sm-3">
                    <ReviewIndexRight />
                </div>
            </div>
        );
    }
});

ReviewsIndex = fluxibleAddons.connectToStores(ReviewsIndex, [reviewStore], function (context, props) {
    return {
        reviews: context.getStore(reviewStore).getReviews()
    };
});

module.exports = ReviewsIndex;