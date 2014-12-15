/* jshint expr: true */

(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("Google Spreadsheet Controls Component", function() {
    beforeEach(function (){
      browser.get("/test/e2e/spreadsheet-controls-test.html");
    });

    it("Should correctly load default defaults", function () {
      expect(element(by.id("spreadsheet")).isDisplayed()).
        to.eventually.be.false;

      expect(element(by.css(".text-danger.error-publish")).isPresent()).
        to.eventually.be.false;

      expect(element(by.id("spreadsheet-controls")).isDisplayed()).
        to.eventually.be.false;

      expect(element(by.css("input[name=cells]:checked")).getAttribute("value")).
        to.eventually.equal("sheet");

      expect(element(by.id("range")).isDisplayed()).
        to.eventually.be.false;

      element.all(by.css("#headerRow option")).then(function (elements) {
        // headerRow select element should display 12 options
        expect(elements.length).to.equal(12);
        // 1st option should be selected
        expect(elements[0].getAttribute("selected")).to.eventually.not.be.null;
      });

      expect(element(by.id("refresh")).getAttribute("value")).
        to.eventually.equal("5");

      expect(element(by.css(".text-danger.error-refresh")).isDisplayed()).
        to.eventually.be.false;
    });

    it("Should correctly show and populate controls by selecting a published file", function () {
      // open dialog
      element(by.css(".btn-google-drive")).click();
      // simulate picks
      element(by.id("published-pick")).click();
      // spreadsheet controls should show
      expect(element(by.id("spreadsheet-controls")).isDisplayed()).
        to.eventually.not.be.null;
      // spreadsheet document hyperlink should show
      expect(element(by.id("spreadsheet")).isDisplayed()).
        to.eventually.be.true;
      // spreadsheet hyperlink href value should be the published one
      expect(element(by.css("#spreadsheet a")).getAttribute("href")).
        to.eventually.equal("https://test-published/");
      // no error message should be present
      expect(element(by.css(".text-danger.error-publish")).isPresent()).
        to.eventually.be.false;

      element.all(by.css("#sheet option")).then(function (elements) {
        // sheets select element should display 4 options
        expect(elements.length).to.equal(4);
        // 1st option should be selected
        expect(elements[0].getAttribute("selected")).to.eventually.not.be.null;
      });
    });

    it("Should show range field when range cells is clicked", function () {
      // open dialog
      element(by.css(".btn-google-drive")).click();
      // simulate pick
      element(by.id("published-pick")).click();
      // click on range cells radio button
      element(by.id("cells-range")).click();

      expect(element(by.css("input[name=cells]:checked")).getAttribute("value")).
        to.eventually.equal("range");
      // range field should be visible
      expect(element(by.id("range")).isDisplayed()).
        to.eventually.be.true;

    });

    it("Should hide range field when sheet cells is clicked", function () {
      // open dialog
      element(by.css(".btn-google-drive")).click();
      // simulate pick
      element(by.id("published-pick")).click();
      // click on sheet cells radio button
      element(by.id("cells-sheet")).click();

      expect(element(by.css("input[name=cells]:checked")).getAttribute("value")).
        to.eventually.equal("sheet");
      // range field should not be visible
      expect(element(by.id("range")).isDisplayed()).
        to.eventually.not.be.null;

    });

    it("Should not show or populate controls when selecting a non-published file", function () {
      // open dialog
      element(by.css(".btn-google-drive")).click();
      // simulate picks
      element(by.id("non-published-pick")).click();
      // spreadsheet controls should show
      expect(element(by.id("spreadsheet-controls")).isDisplayed()).
        to.eventually.be.false;
      // spreadsheet document hyperlink should show
      expect(element(by.id("spreadsheet")).isDisplayed()).
        to.eventually.be.true;
      // spreadsheet hyperlink href value should be the non-published one
      expect(element(by.css("#spreadsheet a")).getAttribute("href")).
        to.eventually.equal("https://test-not-published/");
      // error message should be present
      expect(element(by.css(".text-danger.error-publish")).isPresent()).
        to.eventually.not.be.null;
    });

    it("Should show error message if refresh below 5", function () {
      // open dialog
      element(by.css(".btn-google-drive")).click();
      // simulate picks
      element(by.id("published-pick")).click();
      // input value for refresh
      element(by.css("input[name=refresh]")).clear();
      element(by.css("input[name=refresh]")).sendKeys("3");

      expect(element(by.css(".text-danger.error-refresh")).isDisplayed()).
        to.eventually.be.true;

    });

  });

})();
