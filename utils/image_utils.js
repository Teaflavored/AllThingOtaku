var imageUtils = {
    baseUrl: "http://res.cloudinary.com/teaflavored/image/upload",
    placeholderImagePublic: "Cover-Image_pzjrmk.png",
    getImageUrl: function (image, width, height) {

        if (!image || typeof image != "object") {
            var tempPlaceholderImageUrl = this.baseUrl;
            var placeholderOptions = [];
            if (width) {
                placeholderOptions.push("w_" + width);
            }

            if (height) {
                placeholderOptions.push("h_" + height);
            }

            if (placeholderOptions.length) {
                tempPlaceholderImageUrl = this.baseUrl + "/" + placeholderOptions.join(",");
            }

            return tempPlaceholderImageUrl + "/" + this.placeholderImagePublic;
        }

        var publicId = image.imageId;
        var format = image.imageFormat;

        var options = [];
        var tempUrl = this.baseUrl;

        if (width) {
            options.push("w_" + width);
        }

        if (height) {
            options.push("h_" + height);
        }

        if (options.length) {
            tempUrl = this.baseUrl + "/" + options.join(",");
        }

        return tempUrl + "/" + publicId + "." + format;
    }
};

module.exports = imageUtils;