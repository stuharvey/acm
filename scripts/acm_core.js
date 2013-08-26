/*
    Copyright 2013 ACM of Virginia Tech

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
var acmCore = (function (document) {
    var calendarId = "vt.edu_gd2sbcgh98g7f7871t5i9j2fgo@group.calendar.google.com";
    var apiKey = "AIzaSyAx4gQ1Fzar0yc1LxOpJV3MuerouZCnz-4";

    /**
     * Changes the title of the element with "event-title" as its id.
     *
     * @param newTitle The new title as a string
     */
    var updateEventType = function (newTitle) {
        var eventTitle = document.getElementById("event-title");
        eventTitle.innerHTML = newTitle;
    };

    return {

        /**
         * Loads the events from Google calendar and stores them into
         * a container called "events-container."
         */
        loadEvents: function () {
            
            var calendar = acmCalendar(calendarId, apiKey);

            calendar.getFutureEvents(5, function (contents) {
                var eventsContainer = document.getElementById("events-container");
                eventsContainer.innerHTML = "";

                var headerElement = document.createElement("h2");
                var titleElement = document.createElement("div");
                headerElement.appendChild(titleElement);
                titleElement.id = "event-title";
                titleElement.innerHTML = "Events";

                var listContainer = document.createElement("ul");

                /* Old browsers don't support forEach */
                for (var i = 0; i < contents.length; ++i) {
                    var listElement = document.createElement("li");
                    var contentElement = document.createElement("a");
                    var dateElement = document.createElement("span");

                    var eventLocation = contents[i].location;
                    listElement.title = "Location: " + eventLocation;
                    listElement.onmouseover = (function (loc) {
                        function updateTitle() {
                            titleElement.innerHTML = "Events - " + loc;
                        };

                        return updateTitle;
                    })(eventLocation);
                    listElement.onmouseout = function () {
                        titleElement.innerHTML = "Events";
                    };

                    dateElement.innerHTML = contents[i].date;
                    contentElement.appendChild(dateElement);

                    contentElement.href = "#";
                    contentElement.innerHTML += " - " + contents[i].summary +
                        ": " + contents[i].startTime + " to " + contents[i].endTime;

                    listElement.appendChild(contentElement);
                    listContainer.appendChild(listElement);
                }

                eventsContainer.appendChild(headerElement);
                eventsContainer.appendChild(listContainer);
            });
        }
    };

});

