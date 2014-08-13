(function () {
  "use strict";

  angular.module("risevision.widget.common.google-spreadsheet-controls",
    ["risevision.widget.common.translate", "risevision.widget.common.google-drive-picker",
    "risevision.widget.common.tooltip"])
    .directive("spreadsheetControls", ["$document", "$window", "$log", "$templateCache",
      function ($document, $window, $log, $templateCache) {
      return {
        restrict: "E",
        require: "ngModel",
        scope: {
          spreadsheet: "="
        },
        template: $templateCache.get("spreadsheet-controls.html"),
        link: function (scope, elm, attrs, ctrl) {
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

          // putting the error object on the scope so it can be used in the html
          scope.$error = ctrl.$error;

          // watch your variable and show an error if it is invalid
          scope.$watch("spreadsheetUrl", function(spreadsheetUrl) {
            if (!spreadsheetUrl) {
              ctrl.$setValidity("required", false);
            }
            else if (!spreadsheetUrl.shared) {
              ctrl.$setValidity("notShared", false);
            }
          });


          scope.$watch("spreadsheet", function(spreadsheet) {
            scope.defaults(spreadsheet, scope.defaultSetting);
          });
        }
      };
    }]);

}());
