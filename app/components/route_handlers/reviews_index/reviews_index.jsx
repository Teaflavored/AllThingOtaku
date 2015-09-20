var React = require("react");
var fluxibleAddons = require("fluxible-addons-react");

//stores
var reviewStore = require("../../../stores/review_store");

//actions
var reviewActions = require("../../../actions/review_actions");

//compoennts
var ReviewIndexItem = require("./review_index_item.jsx");

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
                { reviewNodes }
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