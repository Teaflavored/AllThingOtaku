var React = require("react");
var LightNovel = require("./light_novel.jsx");

var LightNovelList = React.createClass({
	render: function () {
				var lightNovels = this.props.lightNovels;
				lightNovelNodes = lightNovels.map(function(lightNovel){
					return (
						<LightNovel title={lightNovel.title} author={lightNovel.author} key={lightNovel._id}/>
						);
				});

				return (
						<div className="lightNovelsList">
							{lightNovelNodes}
						</div>
					)
			}
});

module.exports = LightNovelList;
