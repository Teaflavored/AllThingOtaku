var React = require("react");

//utils
var dateUtils = require("../../../../utils/date_utils");

var ReviewIndexItem = React.createClass({
    render: function () {
        return (
            <div className="card">
                <h4 className="one-line">
                    { this.props.review.title}
                </h4>

                <div className="small">
                    <strong>Posted:</strong> { dateUtils.getFormattedDate(this.props.review.created) }
                </div>
                { this.props.review.reviewBody}
            </div>
        );
    }
});

module.exports = ReviewIndexItem;