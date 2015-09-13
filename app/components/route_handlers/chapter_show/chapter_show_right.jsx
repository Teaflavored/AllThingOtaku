var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var ChapterShowRight = React.createClass({
    render: function () {
        var chaptersCount = this.props.volume.chaptersCount;
        var chapterLinkNodes = [];

        for (var i = 1; i <= chaptersCount; i++) {
            chapterLinkNodes.push(<Link to="chapterShow" key={i} className="chapter-show-sidelink block-link" params={
                { lightNovelId: this.props.params.lightNovelId, volumeNum: this.props.params.volumeNum, chapterNum: i}
            }>Chapter {i}</Link>);
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
