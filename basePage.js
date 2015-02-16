'use strict';

function AbstractBasePage(webdriver, url) {
  this.webdriver = webdriver;
  this.absurl = url;
};

AbstractBasePage.prototype.open = function() {
  this.webdriver.get(this.absurl);
  return this;
};

AbstractBasePage.prototype.getTitle = function() {
  return this.webdriver.getTitle();
};

module.exports = AbstractBasePage;
