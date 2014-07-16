var CONFIG = {};

if(typeof TEMPLATES === 'undefined') {var TEMPLATES = {};}
TEMPLATES['spreadsheet-controls-template.html'] = "<div></div>\n" +
    ""; 
angular.module("risevision.widget.common")
  .directive("spreadsheetControls", ["$log"], function ($log) {
    return {
      restrict: "AE",
      template: TEMPLATES["google-drive-picker-template.html"],
      scope: {}
    };
  });
