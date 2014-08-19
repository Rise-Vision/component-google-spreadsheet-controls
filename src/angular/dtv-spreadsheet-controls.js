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
        scope: {
          spreadsheet: "="
        },
        template: $templateCache.get("spreadsheet-controls.html"),
        link: function (scope) {

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

          scope.docURL = "";
          scope.docName = "";
          scope.sheets = [];
          scope.currentSheet = null;

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
              .then(function(sheets) {
                scope.sheets = sheets;
                scope.spreadsheet.sheet = encodeURI(sheets[0].value);
                scope.currentSheet = sheets[0];
              })
              .then(null, $log.error);
          });

          scope.$on("cancel", function () {
            $log.debug("Spreadsheet Controls received event 'cancel'");
          });
        }
      };
    }]);

}());
