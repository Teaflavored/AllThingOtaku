var createStore = require("fluxible/addons/createStore");
var _ = require("lodash");

var reviewStore = createStore({
    storeName: "reviewStore",
    handlers: {
        "FIND_REVIEWS_ERR" : "findReviewsErr",
        "FIND_REVIEWS" : "findReviews",
        "FIND_REVIEW_ERR" : "findReviewErr",
        "FIND_REVIEW" : "findReview",
        "CREATE_REVIEW_ERR" : "createReviewErr"
    },
    initialize: function () {
        this.currentReview = {};
        this.reviews = {};
    },
    dehydrate: function () {
        return {
            currentReview: this.currentReview,
            reviews: this.reviews
        };
    },
    rehydrate: function (state) {
        this.currentReview = state.currentReview;
        this.reviews = state.reviews;
    },
    findReviewsErr: function () {

    },
    findReviews: function (reviews) {
        _.forEach(reviews, function (review) {
            this.reviews[review._id] = review;
        }.bind(this));
        this.emitChange();
    },
    findReviewErr: function () {

    },
    findReview: function (review) {
        this.currentReview = review;
        this.emitChange();
    },
    createReviewErr: function () {

    },
    getReviews: function () {
        return _.values(this.reviews)
    },
    getCurrentReview: function () {
        return this.currentReview
    }
});

module.exports = reviewStore;