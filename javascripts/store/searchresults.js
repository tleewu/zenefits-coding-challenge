var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;

'use strict';

var _results = [];
var current = 0;
CHANGE = "CHANGE";

var SearchResultsStore = $.extend({}, EventEmitter.prototype, {

  get: function () {
    return _results[current];
  },

  addChangeListener: function (callback) {
    this.on(CHANGE, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE, callback);
  },

  changed: function () {
    this.emit(CHANGE);
  },

  dispatcherID: AppDispatcher.register(function (action) {
    switch (action.actionType){
      case "TEST4":
        _results = action.results;
        current = 0;
        SearchResultsStore.changed();
        break;
    }
  })
});

module.exports = SearchResultsStore;
