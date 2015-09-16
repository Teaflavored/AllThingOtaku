var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var ChapterShowRight = React.createClass({
    render: function () {
        var chaptersCount = this.props.volume.chaptersCount;
        var chapterLinkNodes = [];

        for (var i = 1; i <= chaptersCount; i++) {
            var url = "/lightNovels/" + this.props.params.lightNovelId + "/volume/" + this.props.params.volumeNum + "/chapter/" + i;
            chapterLinkNodes.push(<Link to={url} key={i}
                                        className="chapter-show-sidelink block-link">Chapter {i}</Link>);
        }

        return (
            <div className="card">
                <h5><strong>All Chapters</strong></h5>
                {chapterLinkNodes}
                <h5><strong>Similar Light Novels</strong></h5>
            </div>
        );
    }
});

module.exports = ChapterShowRight;
