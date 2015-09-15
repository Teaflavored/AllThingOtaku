var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

//utils
var imageUtils = require("../../../../utils/image_utils");

var LightNovel = React.createClass({
    render: function () {
        var author = this.props.lightNovel.author;
        var title = this.props.lightNovel.title;
        var lightNovelId = this.props.lightNovel._id;
        var imageId = this.props.lightNovel.imageId;
        var imageFormat = this.props.lightNovel.imageFormat;

        var imageUrl = imageUtils.getImageUrl(imageId, imageFormat, 183, 248);

        return (
            <div className="col-sm-4 col-md-3">
                <div className="light-novel card text-center">
                    <Link to="lightNovelShow" params={ { lightNovelId : lightNovelId } }>
                        <div className="img-wrapper">
                            <img src={imageUrl} alt=" "/>
                        </div>
                        <div className="title-wrapper">
                            <div className="title">
                                { title }
                            </div>
                        </div>
                    </Link>

                    <div className="author">
                        { author }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LightNovel;
