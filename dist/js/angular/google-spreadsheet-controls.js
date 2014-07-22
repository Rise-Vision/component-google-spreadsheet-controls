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
    "      <label for=\"cells-sheet\">{{ \"cells.sheet\" | translate }}</label>\n" +
    "      <input id=\"cells-sheet\" type=\"radio\" name=\"cells\" value=\"sheet\">\n" +
    "    </div>\n" +
    "    <div class=\"radio\">\n" +
    "      <label for=\"cells-range\">{{ \"cells.range\" | translate }}</label>\n" +
    "      <input id=\"cells-range\" type=\"radio\" name=\"cells\" value=\"range\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"range\">{{ \"range.label\" | translate }}</label>\n" +
    "    <tooltip data-toggle=\"popover\" data-placement=\"right\"\n" +
    "             data-content=\"{{'range.tooltip' | translate}}\">\n" +
    "    </tooltip>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-8\">\n" +
    "        <input id=\"range\" name=\"range\" class=\"small form-control\" type=\"text\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"sheet\">{{ \"sheet\" | translate }}</label>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-8\">\n" +
    "        <select id=\"sheet\" name=\"sheet\" class=\"form-control\"></select>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"headerRows\">{{ \"headerRows.label\" }}</label>\n" +
    "    <tooltip data-toggle=\"popover\" data-placement=\"top\"\n" +
    "             data-content=\"{{'headerRows.tooltip' | translate}}\">\n" +
    "    </tooltip>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-4 col-sm-3\">\n" +
    "        <select id=\"headerRows\" name=\"headerRows\" class=\"form-control\">\n" +
    "          <option value=\"-1\">Auto</option>\n" +
    "          <option value=\"0\">0</option>\n" +
    "          <option value=\"1\">1</option>\n" +
    "          <option value=\"2\">2</option>\n" +
    "          <option value=\"3\">3</option>\n" +
    "          <option value=\"4\">4</option>\n" +
    "          <option value=\"5\">5</option>\n" +
    "          <option value=\"6\">6</option>\n" +
    "          <option value=\"7\">7</option>\n" +
    "          <option value=\"8\">8</option>\n" +
    "          <option value=\"9\">9</option>\n" +
    "          <option value=\"10\">10</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
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
    "      <input id=\"refresh\" name=\"refresh\" type=\"text\" class=\"form-control\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

angular.module("risevision.widget.common")
  .directive("spreadsheetControls", ["$log"], function ($log) {
    return {
      restrict: "AE",
      template: TEMPLATES["google-drive-picker-template.html"],
      scope: {}
    };
  });
