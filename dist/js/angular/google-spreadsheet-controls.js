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
    .directive("spreadsheetControls", ["$document", "$window", "$log", "$templateCache",
      function ($document, $window, $log, $templateCache) {
      return {
        restrict: "E",
        scope: {
          spreadsheet: "="
        },
        template: $templateCache.get("spreadsheet-controls.html"),
        link: function (scope) {
          var google = $window.google;

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

          scope.$watch("spreadsheet", function (spreadsheet) {
            scope.defaults(spreadsheet, scope.defaultSetting);
          });

          scope.$on("picked", function (event, data) {
            $log.debug("Spreadsheet Controls received event 'picked'", data);

            var doc = data[google.picker.Response.DOCUMENTS][0]; // jshint ignore:line

            //TODO: get sheets, best practice will be to use an angular service
          });

          scope.$on("cancel", function () {
            $log.debug("Spreadsheet Controls received event 'cancel'");
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
    "    <small class=\"help-block\" ng-show=\"$error.notShared\">\n" +
    "      {{\"spreadsheet.error.not-shared\" | translate}}\n" +
    "    </small>\n" +
    "    <div id=\"spreadsheetUrl\" class=\"well well-sm\" ng-show=\"spreadsheet.url !== ''\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"url-options\">\n" +
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
    "        <div class=\"col-xs-8\">\n" +
    "          <input id=\"range\" name=\"range\" ng-model=\"spreadsheet.range\" class=\"form-control\" type=\"text\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sheet\">{{ \"spreadsheet.sheet\" | translate }}</label>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-8\">\n" +
    "          <select id=\"sheet\" name=\"sheet\" ng-model=\"spreadsheet.sheet\" class=\"form-control\"></select>\n" +
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
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"refresh\">{{ \"spreadsheet.refresh.label\" | translate }}</label>\n" +
    "    <tooltip data-toggle=\"popover\" data-placement=\"top\"\n" +
    "             data-content=\"{{'spreadsheet.refresh.tooltip' | translate}}\">\n" +
    "    </tooltip>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-4 col-sm-3\">\n" +
    "        <input id=\"refresh\" name=\"refresh\" ng-model=\"spreadsheet.refresh\" type=\"text\" class=\"form-control\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();
