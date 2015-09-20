var dateUtils = {
    TODAY: "today",
    YESTERDAY: "yesterday",
    defaultSeparator: "/",
    getRelativeDaysFormat: function (daysAgo) {
        return daysAgo + " days ago";
    },
    getRelativeFormat: function (dateArray) {
        var month = dateArray[0],
            day = dateArray[1],
            year = dateArray[2];

        var today = new Date();

        if (today.getMonth() == month && today.getFullYear() == year) {
            if (today.getDate() == day) {
                return this.TODAY;
            } else if (day + 1 == today.getDate()) {
                return this.YESTERDAY;
            } else if (day + 3 <= today.getDate()) {
                var daysAgo = today.getDate() - day;
                return this.getRelativeDaysFormat(daysAgo);
            } else {
                return "";
            }
        } else {
            return "";
        }
    },
    getFormattedDate: function (timestamp, options) {
        var date = new Date(timestamp);

        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();

        var dateArray = [month, day, year];

        var relativeDate = this.getRelativeFormat(dateArray);
        if (relativeDate) {
            return relativeDate;
        } else {
            return [month + 1, day, year].join(this.defaultSeparator);
        }
    }
};

module.exports = dateUtils;