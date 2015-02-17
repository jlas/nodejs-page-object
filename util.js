'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function errorHandler() {
  console.log('Got an error');
}

module.exports = {
  getRandomInt: getRandomInt,
  errorHandler: errorHandler
};