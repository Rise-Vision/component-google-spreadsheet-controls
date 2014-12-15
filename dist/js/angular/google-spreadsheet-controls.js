/* global CONFIG: true */
/* exported CONFIG */
if (typeof CONFIG === "undefined") {
  var CONFIG = {
    // variables go here
  };
}

(function () {
  "use strict";

  angular.module("risevision.widget.common.google-spreadsheet-controls", [
    "risevision.widget.common.translate",
    "risevision.widget.common.google-drive-picker",
    "risevision.widget.common.tooltip"])
    .directive("spreadsheetControls", ["$log", "$templateCache", "sheets",
      function ($log, $templateCache, sheets) {
      return {
        restrict: "E",
        require: "?ngModel",
        scope: {
          spreadsheet: "="
        },
        template: $templateCache.get("spreadsheet-controls.html"),
        link: function (scope, elm, attrs, ctrl) {

          var defaultDocSettings = {
              docName: "",
              docURL: ""
            },
            defaultSpreadsheetSettings = {
              fileId: "",
              url: "",
              sheetIndex: 0,
              cells: "sheet",
              range: "",
              headerRow: "-1",
              refresh: 5
            },
            $sheetSel = $(elm).find("#sheet");

          function configureURL() {
            if (scope.currentSheet) {
              var url = scope.currentSheet.value;
              // add header rows to URL
              url += "&headers=" + scope.spreadsheet.headerRow;
              // add range to URL if applicable
              if (scope.spreadsheet.cells === "range" && scope.spreadsheet.range !== "") {
                url += "&range=" + scope.spreadsheet.range;
              }

              scope.spreadsheet.url = encodeURI(url);
            }
          }

          function reset() {
            angular.extend(scope.spreadsheet, defaultSpreadsheetSettings);

            // Not resetting spreadsheet Doc values as these are necessary to persist

            scope.sheets = [];
            scope.currentSheet = null;
          }

          function getSheets(fileId) {
            sheets.getSheets(fileId)
              .then(function (sheets) {
                scope.published = true;
                scope.sheets = sheets;
                scope.currentSheet = sheets[scope.spreadsheet.sheetIndex];
              })
              .then(null, function () {
                scope.published = false;
                reset();
              });
          }

          scope.sheets = [];
          scope.currentSheet = null;
          scope.published = true;

          scope.defaults = function (obj) {
            if (obj) {
              for (var i = 1, length = arguments.length; i < length; i++) {
                var source = arguments[i];
                for (var prop in source) {
                  if (obj[prop] === void 0) {
                    obj[prop] = source[prop];
                  }
                }
              }
            }
            return obj;
          };

          if (ctrl) {
            scope.$watch("spreadsheet.url", function (url) {
              var valid = true;
              if (!url || url === "") {
                valid = false;
              }

              ctrl.$setValidity("required", valid);
            });
          }

          scope.$watch("spreadsheet", function (spreadsheet) {
            scope.defaults(spreadsheet, defaultSpreadsheetSettings);
            scope.defaults(spreadsheet, defaultDocSettings);
          });

          scope.$watch("spreadsheet.fileId", function (fileId) {
            if (fileId && fileId !== "") {
              getSheets(fileId);
            }
          });

          scope.$watch("spreadsheet.range", configureURL);
          scope.$watch("spreadsheet.headerRow", configureURL);
          scope.$watch("currentSheet", function (currentSheet) {
            if (currentSheet) {
              scope.spreadsheet.sheetIndex = $sheetSel[0].selectedIndex;
              configureURL();
            }
          });

          scope.$on("picked", function (event, data) {
            scope.spreadsheet.docName = data[0].name;
            scope.spreadsheet.docURL = encodeURI(data[0].url);
            scope.spreadsheet.fileId = data[0].id;
          });
        }
      };
    }]);

}());

(function(module) {
try { app = angular.module("risevision.widget.common.google-spreadsheet-controls"); }
catch(err) { app = angular.module("risevision.widget.common.google-spreadsheet-controls", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("spreadsheet-controls.html",
    "<div class=\"section\">\n" +
    "  <h5>{{\"spreadsheet.heading\" | translate}}</h5>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label>\n" +
    "      {{\"spreadsheet.select\" | translate}} &nbsp; <google-drive-picker view-id=\"spreadsheets\"></google-drive-picker>\n" +
    "    </label>\n" +
    "    <div ng-if=\"!published\">\n" +
    "      <span class=\"text-danger error-publish\">{{ \"spreadsheet.error.publish\" | translate }}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-10\">\n" +
    "      <div id=\"spreadsheet\" class=\"well well-sm\" ng-show=\"spreadsheet.docURL !== ''\">\n" +
    "        <a target=\"_blank\" href=\"{{ spreadsheet.docURL }}\">{{ spreadsheet.docName }}</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div id=\"spreadsheet-controls\" ng-show=\"spreadsheet.url !== ''\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>{{ \"spreadsheet.cells.label\" | translate }}</label>\n" +
    "      <div class=\"radio\">\n" +
    "        <label for=\"cells-sheet\">\n" +
    "          <input id=\"cells-sheet\" type=\"radio\" name=\"cells\" ng-model=\"spreadsheet.cells\" value=\"sheet\"> {{ \"spreadsheet.cells.sheet\" | translate }}\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"radio\">\n" +
    "        <label for=\"cells-range\">\n" +
    "          <input id=\"cells-range\" type=\"radio\" name=\"cells\" ng-model=\"spreadsheet.cells\" value=\"range\"> {{ \"spreadsheet.cells.range\" | translate }}\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-hide=\"spreadsheet.cells !== 'range'\">\n" +
    "      <label for=\"range\">\n" +
    "        {{ \"spreadsheet.range.label\" | translate }}\n" +
    "      </label>\n" +
    "      <span popover=\"{{'spreadsheet.range.tooltip' | translate}}\" popover-trigger=\"click\"\n" +
    "            popover-placement=\"right\" rv-tooltip></span>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <input id=\"range\" name=\"range\" ng-model=\"spreadsheet.range\" class=\"form-control\" type=\"text\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sheet\">{{ \"spreadsheet.sheet\" | translate }}</label>\n" +
    "      <select id=\"sheet\" name=\"sheet\" ng-model=\"currentSheet\" ng-options=\"sheet.label for sheet in sheets\" class=\"form-control\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"headerRow\">{{ \"spreadsheet.headerRow.label\" | translate }}</label>\n" +
    "      <span popover=\"{{'spreadsheet.headerRow.tooltip' | translate}}\" popover-trigger=\"click\"\n" +
    "            popover-placement=\"right\" rv-tooltip></span>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-6 col-md-3\">\n" +
    "          <select id=\"headerRow\" name=\"headerRow\" ng-model=\"spreadsheet.headerRow\" class=\"form-control\">\n" +
    "            <option value=\"-1\">{{'spreadsheet.headerRow.auto' | translate}}</option>\n" +
    "            <option value=\"0\">0</option>\n" +
    "            <option value=\"1\">1</option>\n" +
    "            <option value=\"2\">2</option>\n" +
    "            <option value=\"3\">3</option>\n" +
    "            <option value=\"4\">4</option>\n" +
    "            <option value=\"5\">5</option>\n" +
    "            <option value=\"6\">6</option>\n" +
    "            <option value=\"7\">7</option>\n" +
    "            <option value=\"8\">8</option>\n" +
    "            <option value=\"9\">9</option>\n" +
    "            <option value=\"10\">10</option>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"refresh\">{{ \"spreadsheet.refresh.label\" | translate }}</label>\n" +
    "      <span popover=\"{{'spreadsheet.refresh.tooltip' | translate}}\" popover-trigger=\"click\"\n" +
    "            popover-placement=\"top\" rv-tooltip></span>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-6 col-md-3\">\n" +
    "          <div class=\"input-group\">\n" +
    "            <input id=\"refresh\" name=\"refresh\" ng-model=\"spreadsheet.refresh\" type=\"number\" min=\"5\" required class=\"form-control\" />\n" +
    "            <span class=\"input-group-addon\">{{'common.units.minutes' | translate}}</span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div ng-hide=\"spreadsheet.refresh >= 5\">\n" +
    "        <span class=\"text-danger error-refresh\">{{ \"spreadsheet.error.refresh\" | translate }}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function() {

  "use strict";

  angular.module("risevision.widget.common.google-spreadsheet-controls")
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
