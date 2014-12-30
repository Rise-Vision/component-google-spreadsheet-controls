(function() {

  "use strict";

  angular.module("risevision.widget.common.google-spreadsheet-controls.service", [])
    .constant("SPREADSHEET_API_BASE", "https://spreadsheets.google.com/feeds/worksheets/")
    .constant("SPREADSHEET_API_SUFFIX", "/public/basic")

    .factory("sheets", ["$http", "$log", "SPREADSHEET_API_BASE", "SPREADSHEET_API_SUFFIX",
      function ($http, $log, SPREADSHEET_BASE_API, SPREADSHEET_API_SUFFIX) {

        var factory = {},
          filterSheets = function (data) {
            var option, href, sheets = [];

            angular.forEach(data.feed.entry, function (value) {
              option = document.createElement("option");
              //Sheet name
              option.text = value.title.$t;
              /* Visualization API doesn't refresh properly if 'pub' parameter is
               present, so remove it.
               */
              href = value.link[2].href;
              // Visualization URL
              href = href.replace("&pub=1", "");
              /* Use docs.google.com domain when using new Google Sheets due to
               this bug - http://goo.gl/4Zf8LQ.
               If /gviz/ is in the URL path, then use this as an indicator that the
               new Google Sheets is being used.
               */
              option.value = (href.indexOf("/gviz/") === -1) ? href :
                href.replace("spreadsheets.google.com", "docs.google.com");

              sheets.push(option);
            });

            return sheets;
          };

        factory.getSheets = function(fileId) {
          var date = new Date(),
            dummy = date.toLocaleDateString().split("/").join("") + date.getHours().toString(),
            api = SPREADSHEET_BASE_API + fileId + SPREADSHEET_API_SUFFIX;

          return $http.get(encodeURI(api + "?alt=json&dummy=" + dummy))
            .then(function (response) {
              return response.data;
            })
            .then(function (data) {
              return filterSheets(data);
            });
        };

        return factory;

    }]);
}());
