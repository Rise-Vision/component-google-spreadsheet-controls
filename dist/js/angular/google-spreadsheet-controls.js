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

          function configureURL() {
            if (scope.currentSheet) {
              var url = scope.currentSheet.value;
              // add header rows to URL
              url += "&headers=" + Number(scope.spreadsheet.headerRow);
              // add range to URL if applicable
              if (scope.spreadsheet.cells === "range" && scope.spreadsheet.range !== "") {
                url += "&range=" + scope.spreadsheet.range;
              }

              scope.spreadsheet.url = encodeURI(url);
            }
          }

          function reset() {
            scope.spreadsheet = angular.copy(scope.defaultSetting);
            scope.sheets = [];
            scope.currentSheet = null;
          }

          scope.docURL = "";
          scope.docName = "";
          scope.sheets = [];
          scope.currentSheet = null;
          scope.published = true;

          scope.defaultSetting = {
            url: "",
            cells: "sheet",
            range: "",
            sheet: "",
            headerRow: false,
            refresh: "60"
          };

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
              if (!url || url === "") {
                ctrl.$setValidity("required", false);
              }
            });
          }

          scope.$watch("spreadsheet", function (spreadsheet) {
            scope.defaults(spreadsheet, scope.defaultSetting);
          });

          scope.$watch("spreadsheet.range", configureURL);
          scope.$watch("spreadsheet.headerRow", configureURL);

          scope.$watch("currentSheet", function (sheet) {
            if (sheet) {
              scope.spreadsheet.sheet = encodeURI(sheet.value);
              configureURL();
            }
          });

          scope.$on("picked", function (event, data) {
            scope.docName = data[0].name;
            scope.docURL = data[0].url;

            sheets.getSheets(data[0].id)
              .then(function (sheets) {
                scope.published = true;
                scope.sheets = sheets;
                scope.spreadsheet.sheet = encodeURI(sheets[0].value);
                scope.currentSheet = sheets[0];
              })
              .then(null, function (error) {
                $log.error(error);
                scope.published = false;
                reset();
              });
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
    "      <span class=\"text-danger\">{{ \"spreadsheet.error.publish\" | translate }}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-10\">\n" +
    "      <div id=\"spreadsheet\" class=\"well well-sm\" ng-show=\"docURL !== ''\">\n" +
    "        <a target=\"_blank\" href=\"{{ docURL }}\">{{ docName }}</a>\n" +
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
    "      <label for=\"range\">{{ \"spreadsheet.range.label\" | translate }}</label>\n" +
    "      <tooltip data-toggle=\"popover\" data-placement=\"right\"\n" +
    "               data-content=\"{{'spreadsheet.range.tooltip' | translate}}\">\n" +
    "      </tooltip>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-10\">\n" +
    "          <input id=\"range\" name=\"range\" ng-model=\"spreadsheet.range\" class=\"form-control\" type=\"text\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sheet\">{{ \"spreadsheet.sheet\" | translate }}</label>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-10\">\n" +
    "          <select id=\"sheet\" name=\"sheet\" ng-model=\"currentSheet\" ng-options=\"sheet.label for sheet in sheets\" class=\"form-control\"></select>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"checkbox\">\n" +
    "        <label for=\"headerRow\">\n" +
    "          <input id=\"headerRow\" name=\"headerRow\" ng-model=\"spreadsheet.headerRow\" type=\"checkbox\"> {{ \"spreadsheet.headerRow.label\" }}\n" +
    "        </label>\n" +
    "        <tooltip data-toggle=\"popover\" data-placement=\"top\"\n" +
    "                 data-content=\"{{'spreadsheet.headerRow.tooltip' | translate}}\">\n" +
    "        </tooltip>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"refresh\">{{ \"spreadsheet.refresh.label\" | translate }}</label>\n" +
    "      <tooltip data-toggle=\"popover\" data-placement=\"top\"\n" +
    "               data-content=\"{{'spreadsheet.refresh.tooltip' | translate}}\">\n" +
    "      </tooltip>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-4 col-sm-3\">\n" +
    "          <input id=\"refresh\" name=\"refresh\" ng-model=\"spreadsheet.refresh\" type=\"text\" class=\"form-control\" />\n" +
    "        </div>\n" +
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
          var dummy = Math.ceil(Math.random() * 100),
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
