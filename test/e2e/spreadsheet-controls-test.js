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
      expect(element(by.css("input[name=cells]:checked")).getAttribute("value")).
        to.eventually.equal("sheet");

      expect(element(by.id("range")).isDisplayed()).
        to.eventually.be.false;

      expect(element(by.id("headerRow")).getAttribute("checked")).
        to.eventually.be.null;

      expect(element(by.id("refresh")).getAttribute("value")).
        to.eventually.equal("60");
    });

    it("Should show range field when range cells is clicked", function () {
      //click on range cells radio button
      element(by.id("cells-range")).click();

      expect(element(by.css("input[name=cells]:checked")).getAttribute("value")).
        to.eventually.equal("range");

      expect(element(by.id("range")).isDisplayed()).
        to.eventually.be.true;

    });

    it("Should disable range field when sheet cells is clicked", function () {
      //click on sheet cells radio button
      element(by.id("cells-sheet")).click();

      expect(element(by.css("input[name=cells]:checked")).getAttribute("value")).
        to.eventually.equal("sheet");

      expect(element(by.id("range")).isDisplayed()).
        to.eventually.not.be.null;

    });

  });

})();
