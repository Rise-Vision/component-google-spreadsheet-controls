/*jshint expr:true */
"use strict";

describe("Services: sheets", function() {

  var sheetsService, base, suffix, httpBackend;

  var successData = {
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
        }
      ]
    }
  };

  beforeEach(module("risevision.widget.common.google-spreadsheet-controls.service"));

  beforeEach(inject(function (_sheets_, _SPREADSHEET_API_BASE_, _SPREADSHEET_API_SUFFIX_, $httpBackend) {
    sheetsService = _sheets_;
    base = _SPREADSHEET_API_BASE_;
    suffix = _SPREADSHEET_API_SUFFIX_;
    httpBackend = $httpBackend;

  }));

  it("should exist", function() {
    expect(sheetsService).be.defined;
  });

  it("should successfully provide sheets as select field options", function () {
    function getHTTP(key) {
      var date = new Date(),
        cacheBuster = date.toLocaleDateString().split("/").join("") + date.getHours().toString();

      return base + key + suffix + "?alt=json&dummy=" + cacheBuster;
    }

    httpBackend.whenGET(getHTTP("published")).respond(function () {
      return [200, successData, {}];
    });

    sheetsService.getSheets("published").then(function (results) {
      expect(results).be.defined;
      expect(results.length).to.equal(2);
      expect(results[0].text).equal("Worksheet 1");
      expect(results[1].value).equal("https://test=published&sheet=test2");
    });
    httpBackend.flush();
  });


});
