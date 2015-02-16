'use strict';

var LoginPage = require('./lnkdinPages').LoginPage;
var PeoplePage = require('./lnkdinPages').PeoplePage;

var webdriver = require('./driver');

var loginPage = new LoginPage(webdriver);
loginPage.open();
loginPage.login('email', 'password');

var peoplePage = new PeoplePage(webdriver);
peoplePage.open();
peoplePage.connect();