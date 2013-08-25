/*
 * Written by Chip Senkbeil.
 */
var acmCalendar = (function (calendarId, apiKey) {
    var restUrl = "https://www.googleapis.com/calendar/v3/calendars/" + 
        calendarId + "/events?key=" + apiKey;

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
     * Constructs the provided time with AM/PM.
     *
     * @param dateTimeString The datetime formatted as a string
     *
     * @return The string representing the time with AM/PM
     */
    var getTimeWithMeridiem = function (dateTimeString) {
        var dt = acmDateTime();
        var dateTime = dt.getDateTimeFromString(dateTimeString);
        var timeString = "";

        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        if (hour < 12) {
            if (hour === 0) {
                hour = 12;
            } else {
                timeString += padNumber(hour);
            }

            timeString += ":" + padNumber(minute) + " AM";
        } else {
            if (hour !== 12) {
                hour -= 12;
            }

            timeString += padNumber(hour) + ":" + 
                padNumber(minute) + " PM";
        }

        return timeString;
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
            var dt = acmDateTime();

            var futureEventsUrl = restUrl + "&timeMin=" + 
                encodeURIComponent(dt.getCurrentDateTimeAsString());

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
                                    dateStart = futureEvent.start.dateTime,
                                    dateEnd = futureEvent.end.dateTime;

                                if (!summary) {
                                    futureEvent.summary = "";
                                }

                                if (!location) {
                                    futureEvent.location = "";
                                }

                                if (!dateStart) {
                                    futureEvent.date = "";
                                    futureEvent.startTime = "";
                                } else {
                                    futureEvent.date = 
                                        dt.getYearFromDateTimeString(dateStart) + "/" +
                                        dt.getMonthFromDateTimeString(dateStart) + "/" +
                                        dt.getDayFromDateTimeString(dateStart);
                                    futureEvent.startTime = 
                                        getTimeWithMeridiem(dateStart);
                                }

                                if (!dateEnd) {
                                    futureEvent.endTime = "";
                                } else {
                                    futureEvent.endTime = 
                                        getTimeWithMeridiem(dateEnd);
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

