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
