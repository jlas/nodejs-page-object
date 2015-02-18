'use strict';

var By = require('selenium-webdriver').By;

var abp = require('./basePage');
var util = require('./util');


/*
 * Login Page
 */

function LoginPage (webdriver) {
  abp.call(this, webdriver, 'https://members.wework.com/login');
}

LoginPage.prototype = Object.create(abp.prototype);
LoginPage.prototype.constructor = LoginPage;

LoginPage.prototype.login = function(email, password) {
  this.webdriver.findElement(By.id('email_input')).sendKeys(email);
  this.webdriver.findElement(By.id('password_input')).sendKeys(password);
  this.webdriver.findElement(By.css('[type="submit"]')).click();

  // we work takes a while to login
  this.webdriver.sleep(6000);
};


/*
 * People Page
 */

function DirectoryPage (webdriver) {
  abp.call(this, webdriver, 'https://members.wework.com/directory');
}

DirectoryPage.prototype = Object.create(abp.prototype);
DirectoryPage.prototype.constructor = DirectoryPage;

DirectoryPage.prototype.connect = function() {
  var webdriver = this.webdriver;

  // Flag to refresh the page if we get stuck
  var refresh = false;

  // Track total number of iterations we make
  var count = 0;

  for (var i = 0; i < 1000; i++) {
    var connectBtnsQ = this.webdriver.findElements(By.css('[ng-click="follow(member.uuid)"]'));
    connectBtnsQ.then(function(btns) {
      btns.forEach(function(btn) {

        btn.getText().then(function(text) {
          if (text === 'FOLLOWING') {
            return;
          }
          btn.click().then(function() { console.log(count++); }, util.errorHandler);
          webdriver.sleep(util.getRandomInt(3, 5) * 1000);
        });

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
  DirectoryPage: DirectoryPage
};
