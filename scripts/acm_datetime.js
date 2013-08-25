/*
 * Written by Chip Senkbeil.
 */
var acmDateTime = (function () {

    /**
     * Add a zero to the number (represented as a string) if single digit.
     *
     * @param number The number to pad with a zero
     *
     * @return The string representation of the number
     */
    var padNumber = function (number) {
        if (number < 10) {
            return "0" + number;
        } else {
            return number;
        }
    };

    /**
     * API of methods available.
     */
    return {

        /**
         * Parses a datetime formatted string and constructs a new Date object
         * from the string.
         *
         * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
         *
         * @return The Date object
         */
        getDateTimeFromString: function (dateTimeString) {
            var m = dateTimeString.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/);
            return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0);
        },

        /**
         * Determines the difference in milliseconds between the two provided
         * datetime formatted strings.
         *
         * @param startDateTimeString The starting datetime as a string
         * @param endDateTimeString The ending datetime as a string
         *
         * @return The difference in milliseconds
         */
        getDifferenceInDateTimeStrings: function (startDateTimeString, endDateTimeString) {
            var startDateTime = this.getDateTimeFromString(startDateTimeString),
                endDateTime = this.getDateTimeFromString(endDateTimeString);

            return (endDateTime - startDateTime);
        },

        /**
         * Yanks the year from the datetime formatted string.
         *
         * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
         *
         * @return The year as a string
         */
        getYearFromDateTimeString: function (dateTimeString) {
            var year = padNumber(this.getDateTimeFromString(dateTimeString).getFullYear());

            return year;
        },

        /**
         * Yanks the month from the datetime formatted string.
         *
         * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
         *
         * @return The month as a string
         */
        getMonthFromDateTimeString: function (dateTimeString) {
            var month = padNumber(this.getDateTimeFromString(dateTimeString).getMonth() + 1);

            return month;
        },

        /**
         * Yanks the day from the datetime formatted string.
         *
         * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
         *
         * @return The day as a string
         */
        getDayFromDateTimeString: function (dateTimeString) {
            var day = padNumber(this.getDateTimeFromString(dateTimeString).getDate());

            return day;
        },

        /**
         * Yanks the hours from the datetime formatted string.
         *
         * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
         *
         * @return The hours as a string
         */
        getHoursFromDateTimeString: function (dateTimeString) {
            var hours = padNumber(this.getDateTimeFromString(dateTimeString).getHours());

            return hours;
        },

        /**
         * Yanks the minutes from the datetime formatted string.
         *
         * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
         *
         * @return The minutes as a string
         */
        getMinutesFromDateTimeString: function (dateTimeString) {
            var minutes = padNumber(this.getDateTimeFromString(dateTimeString).getMinutes());

            return minutes;
        },

        /**
         * Yanks the seconds from the datetime formatted string.
         *
         * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
         *
         * @return The seconds as a string
         */
        getSecondsFromDateTimeString: function (dateTimeString) {
            var seconds = padNumber(this.getDateTimeFromString(dateTimeString).getSeconds());

            return seconds;
        },

        /**
         * Determines the datetime formatted representation of the current time.
         *
         * @return A string formatted as YYYY-MM-DDThh:mm:ssTZD
         */
        getCurrentDateTimeAsString: function () {
            var now = new Date();
            var year = now.getFullYear(), month = now.getMonth(), day = now.getDate(),
                hour = now.getHours(), minute = now.getMinutes(), second = now.getSeconds(),
                tzd = now.getTimezoneOffset();

            year = "" + year;

            month = padNumber(month+1);
            day = padNumber(day);
            hour = padNumber(hour);
            minute = padNumber(minute);
            second = padNumber(second);

            (function () {
                var tzdSign = "";
                if (tzd < 0) {
                    tzdSign = "-";
                } else {
                    tzdSign = "+";
                }

                var tzdHour = padNumber(Math.abs(tzd / 60));
                tzd = tzdSign + tzdHour + ":00";
            })();


            return "" + year + "-" + month + "-" + day + "T" +
                hour + ":" + minute + ":" + second + tzd;
        }

    };

});

