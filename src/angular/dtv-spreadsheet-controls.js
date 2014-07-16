angular.module("risevision.widget.common")
  .directive("spreadsheetControls", ["$log"], function ($log) {
    return {
      restrict: "AE",
      template: TEMPLATES["google-drive-picker-template.html"],
      scope: {}
    };
  });
