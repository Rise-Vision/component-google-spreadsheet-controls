(function () {
  "use strict";

  angular.module("http-mock", ["ngMockE2E"])

    // define our fake backend
    .run(["$httpBackend", "$log", "SPREADSHEET_API_BASE", "SPREADSHEET_API_SUFFIX",
      function($httpBackend, $log, SPREADSHEET_API_BASE, SPREADSHEET_API_SUFFIX) {

        var successData = {
            version: "1.0",
            encoding: "UTF-8",
            feed: {
              entry: [
                {
                  title: {
                    $t: "Worksheet 1"
                  },
                  link: [
                    {}, {}, {
                      href: "https://test=published&sheet=test1&pub=1"
                    }, {}
                  ]
                },{
                  title: {
                    $t: "Worksheet 2"
                  },
                  link: [
                    {}, {}, {
                      href: "https://test=published&sheet=test2&pub=1"
                    }, {}
                  ]
                },{
                  title: {
                    $t: "Worksheet 3"
                  },
                  link: [
                    {}, {}, {
                      href: "https://test=published&sheet=test3&pub=1"
                    }, {}
                  ]
                },{
                  title: {
                    $t: "Worksheet 4"
                  },
                  link: [
                    {}, {}, {
                      href: "https://test=published&sheet=test4&pub=1"
                    }, {}
                  ]
                }
              ]
            }
          };

        function getHTTP(key) {
          var date = new Date(),
            cacheBuster = date.toLocaleDateString().split("/").join("") + date.getHours().toString();

          return SPREADSHEET_API_BASE + key + SPREADSHEET_API_SUFFIX + "?alt=json&dummy=" + cacheBuster;
        }

        $httpBackend.whenGET(getHTTP("published")).respond(function () {
          return [200, successData, {}];
        });

        $httpBackend.whenGET(getHTTP("not-published")).respond(function () {
          return [302, {}, {}];
        });
    }]);
})();

