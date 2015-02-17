'use strict';

var By = require('selenium-webdriver').By;

var abp = require('./basePage');
var util = require('./util');


/*
 * Login Page
 */

function LoginPage (webdriver) {
  abp.call(this, webdriver, 'https://www.linkedin.com/');
}

LoginPage.prototype = Object.create(abp.prototype);
LoginPage.prototype.constructor = LoginPage;

LoginPage.prototype.login = function(email, password) {
  this.webdriver.findElement(By.id('session_key-login')).sendKeys(email);
  this.webdriver.findElement(By.id('session_password-login')).sendKeys(password);
  this.webdriver.findElement(By.id('signin')).click();
};


/*
 * People Page
 */

function PeoplePage (webdriver) {
  abp.call(this, webdriver, 'https://www.linkedin.com/people/pymk');
}

PeoplePage.prototype = Object.create(abp.prototype);
PeoplePage.prototype.constructor = PeoplePage;

PeoplePage.prototype.connect = function() {
  var webdriver = this.webdriver;

  // Keep list of people we're connecting with
  var prevTitles = [];

  // Flag to refresh the page if we get stuck
  var refresh = false;

  // Track total number of iterations we make
  var count = 0;

  for (var i = 0; i < 1000; i++) {
    var connectBtnsQ = this.webdriver.findElements(By.css('[data-act="request"]'));
    connectBtnsQ.then(function(btns) {
      btns.forEach(function(btn) {

        btn.getAttribute('title').then(function (title) {
          if (prevTitles.indexOf(title) !== -1) {
            // Same person? Probably asking for email at this point
            refresh = true;

          } else {
            console.log((count++) + ' ' + title);
            prevTitles.push(title);
            btn.click().then(null, util.errorHandler);
          }
        }, util.errorHandler);

        webdriver.sleep(util.getRandomInt(3, 5) * 1000);
      });
    });

    if (refresh) {
      webdriver.navigate().refresh();
      prevTitles = [];
      refresh = false;
    }

    webdriver.sleep(2000);
  }
};

module.exports = {
  LoginPage: LoginPage,
  PeoplePage: PeoplePage
};
