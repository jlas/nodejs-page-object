'use strict';

var LoginPage = require('./weworkPages').LoginPage;
var DirectoryPage = require('./weworkPages').DirectoryPage;

var webdriver = require('./driver');

var loginPage = new LoginPage(webdriver);
loginPage.open();
loginPage.login('username', 'password');

var directoryPage = new DirectoryPage(webdriver);
directoryPage.open();
directoryPage.connect();