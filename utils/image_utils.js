var imageUtils = {
    baseUrl: "http://res.cloudinary.com/teaflavored/image/upload",
    placeholderImageUrl: "http://res.cloudinary.com/teaflavored/image/upload/v1442197844/Cover-Image_pzjrmk.png",
    getImageUrlSrcset: function (public_id, format, imageSizes) {
        var imageSrcs = [];
        var idxToSize = {
            0: " 768w",
            1: " 992w"
        };

        if (imageSizes) {
            var width = imageSizes.width;
            var height = imageSizes.height;
            var numSizes = width.length;
        }

        for (var i = 0; i < numSizes; i++) {
            var options = [];
            options.push("w_" + width[i]);
            options.push("h_" + height[i]);

            imageSrcs.push(this.baseUrl + "/" + options.join(",") + "/" + public_id + "." + format + idxToSize[i]);
        }

        return imageSrcs.join(",");
    },
    getImageUrl: function (public_id, format, width, height) {
        if (!public_id) {
            return this.placeholderImageUrl;
        }

        var options = [];
        var tempUrl;

        if (width) {
            options.push("w_" + width);
        }

        if (height) {
            options.push("h_" + height);
        }

        if (options.length) {
            tempUrl = this.baseUrl + "/" + options.join(",");
        }

        if (!tempUrl) {
            tempUrl = this.baseUrl;
        }

        return tempUrl + "/" + public_id + "." + format;
    }
};

module.exports = imageUtils;