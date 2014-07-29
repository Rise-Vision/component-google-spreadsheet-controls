var CONFIG = {};

(function(module) {
try { app = angular.module("risevision.widget.common.google-spreadsheet-controls"); }
catch(err) { app = angular.module("risevision.widget.common.google-spreadsheet-controls", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("spreadsheet-controls.html",
    "<div class=\"url-options\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label>{{ \"cells.label\" | translate }}</label>\n" +
    "    <div class=\"radio\">\n" +
    "      <label for=\"cells-sheet\">\n" +
    "        <input id=\"cells-sheet\" type=\"radio\" name=\"cells\" ng-model=\"spreadsheet.cells\" value=\"sheet\"> {{ \"cells.sheet\" | translate }}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"radio\">\n" +
    "      <label for=\"cells-range\">\n" +
    "        <input id=\"cells-range\" type=\"radio\" name=\"cells\" ng-model=\"spreadsheet.cells\" value=\"range\"> {{ \"cells.range\" | translate }}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"range\">{{ \"range.label\" | translate }}</label>\n" +
    "    <tooltip data-toggle=\"popover\" data-placement=\"right\"\n" +
    "             data-content=\"{{'range.tooltip' | translate}}\">\n" +
    "    </tooltip>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-8\">\n" +
    "        <input id=\"range\" name=\"range\" ng-model=\"spreadsheet.range\" ng-disabled=\"spreadsheet.cells !== 'range'\" class=\"form-control\" type=\"text\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"sheet\">{{ \"sheet\" | translate }}</label>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-8\">\n" +
    "        <select id=\"sheet\" name=\"sheet\" ng-model=\"spreadsheet.sheet\" class=\"form-control\"></select>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label for=\"headerRow\">\n" +
    "        <input id=\"headerRow\" name=\"headerRow\" ng-model=\"spreadsheet.headerRow\" type=\"checkbox\"> {{ \"headerRow.label\" }}\n" +
    "      </label>\n" +
    "      <tooltip data-toggle=\"popover\" data-placement=\"top\"\n" +
    "               data-content=\"{{'headerRow.tooltip' | translate}}\">\n" +
    "      </tooltip>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"refresh\">{{ \"refresh.label\" | translate }}</label>\n" +
    "  <tooltip data-toggle=\"popover\" data-placement=\"top\"\n" +
    "           data-content=\"{{'refresh.tooltip' | translate}}\">\n" +
    "  </tooltip>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-4 col-sm-3\">\n" +
    "      <input id=\"refresh\" name=\"refresh\" ng-model=\"spreadsheet.refresh\" type=\"text\" class=\"form-control\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

angular.module("risevision.widget.common.google-spreadsheet-controls")
  .directive("spreadsheetControls", ["$document", "$window", "$log", "$templateCache",
    function ($document, $window, $log, $templateCache) {
    return {
      restrict: "E",
      scope: {
        spreadsheet: "="
      },
      template: $templateCache.get("spreadsheet-controls.html"),
      link: function (scope) {
        scope.defaultSetting = {
          cells: "sheet",
          range: "",
          sheet: "",
          headerRow: false,
          refresh: "60"
        };

        scope.defaults = function(obj) {
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

        scope.$watch("spreadsheet", function(spreadsheet) {
          scope.defaults(spreadsheet, scope.defaultSetting);
        });
      }
    };
  }]);
