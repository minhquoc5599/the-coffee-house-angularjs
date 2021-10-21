var angular = require('angular');

var hello = require('./app/hello');

require('./index.css');

var app = 'app';
module.exports = app;

angular
  .module(app, [])
  .component('app', hello);
