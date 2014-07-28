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
