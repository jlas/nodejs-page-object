'use strict';

var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

module.exports = driver;