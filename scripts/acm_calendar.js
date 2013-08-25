/*
 * Written by Chip Senkbeil.
 */
var acmCalendar = (function (calendarId, apiKey) {
    var restUrl = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events?key=" + apiKey;

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
     * Parses a datetime formatted string and constructs a new Date object
     * from the string.
     *
     * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
     *
     * @return The Date object
     */
    var getDateTimeFromString = function (dateTimeString) {
        var m = dateTimeString.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/);
        return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0);
    };

    /**
     * Yanks the year from the datetime formatted string.
     *
     * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
     *
     * @return The year as a string
     */
    var getYearFromDateTimeString = function (dateTimeString) {
        var year = padNumber(getDateTimeFromString(dateTimeString).getFullYear());

        return year;
    };

    /**
     * Yanks the month from the datetime formatted string.
     *
     * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
     *
     * @return The month as a string
     */
    var getMonthFromDateTimeString = function (dateTimeString) {
        var month = padNumber(getDateTimeFromString(dateTimeString).getMonth() + 1);

        return month;
    };

    /**
     * Yanks the day from the datetime formatted string.
     *
     * @param dateTimeString A string formatted as YYYY-MM-DDThh:mm:ssTZD
     *
     * @return The day as a string
     */
    var getDayFromDateTimeString = function (dateTimeString) {
        var day = padNumber(getDateTimeFromString(dateTimeString).getDate());

        return day;
    };

    /**
     * Determines the datetime formatted representation of the current time.
     *
     * @return A string formatted as YYYY-MM-DDThh:mm:ssTZD
     */
    var getCurrentDateTimeAsString = function () {
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
    };

    /**
     * Retrieves the contents of a webpage and stores it into the
     * associated data's value.
     *
     * @param url The url of the webpage whose contents to retrieve
     * @param callback The callback to push the response
     */
    var getPageContents = function (url, callback) {
        /* No support for IE5 or IE6 */
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    /**
     * API of methods available.
     */
    return {

        /**
         * Retrieves the future events of the calendar from the current time.
         *
         * @param maxEvents The maximum number of events to return, sorted by
         *     closest to current time
         * @param callback The function to be called with the contents of the
         *     future events as an array argument
         */
        getFutureEvents: function(maxEvents, callback) {
            var futureEventsUrl = restUrl + "&timeMin=" + 
                encodeURIComponent(getCurrentDateTimeAsString());

            if (maxEvents > 0) {
                futureEventsUrl += "&singleEvents=true" +
                    "&orderBy=startTime" +
                    "&maxResults=" + maxEvents;
            }

            /* Parses the text data as JSON and gets only useful information */
            getPageContents(futureEventsUrl, function (contents) {
                try {
                    var futureEvents = JSON.parse(contents).items;

                    if (!futureEvents) {
                        futureEvents = [];
                    }

                    (function () {
                        for (var i = 0; i < futureEvents.length; ++i) {
                            try {
                                var futureEvent = futureEvents[i];
                                var summary = futureEvent.summary,
                                    location = futureEvent.location,
                                    dateTime = futureEvent.start.dateTime;

                                if (!summary) {
                                    futureEvent.summary = "";
                                }

                                if (!location) {
                                    futureEvent.location = "";
                                }

                                if (!dateTime) {
                                    futureEvent.dateTime = "";
                                } else {
                                    futureEvent.dateTime = 
                                        getYearFromDateTimeString(dateTime) + "/" +
                                        getMonthFromDateTimeString(dateTime) + "/" +
                                        getDayFromDateTimeString(dateTime);
                                }
                            } catch (ex) {
                                continue;
                            }
                        }
                    })();

                    callback(futureEvents);
                } catch (ex) {
                    return [];
                }
            });
        }

    };

});

