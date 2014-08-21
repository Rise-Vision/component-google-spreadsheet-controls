(function () {
  "use strict";

  angular.module("risevision.widget.common.google-spreadsheet-controls", [
    "risevision.widget.common.translate",
    "risevision.widget.common.google-drive-picker"])
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
              cells: "sheet",
              range: "",
              sheet: "",
              headerRow: false,
              refresh: "60"
            };

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
            scope.spreadsheet = angular.copy(defaultSpreadsheetSettings);

            // Not resetting spreadsheet Doc values as these are necessary to persist

            scope.sheets = [];
            scope.currentSheet = null;
          }

          function getSheets(fileId) {
            sheets.getSheets(fileId)
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
              if (!url || url === "") {
                ctrl.$setValidity("required", false);
              }
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

          scope.$watch("currentSheet", function (sheet) {
            if (sheet) {
              scope.spreadsheet.sheet = encodeURI(sheet.value);
              configureURL();
            }
          });

          scope.$on("picked", function (event, data) {
            scope.$apply(function () {
              scope.spreadsheet.docName = data[0].name;
              scope.spreadsheet.docURL = encodeURI(data[0].url);
              scope.spreadsheet.fileId = data[0].id;
            });
          });
        }
      };
    }]);

}());
