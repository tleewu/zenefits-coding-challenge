var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/search.js');

'use strict';

var _results = [];
var _max = 1;
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
      case SearchConstants.SEARCH_RESULTS_UPDATED:
        _results = action.results;
        _max = action.length;
        current = 0;
        SearchResultsStore.changed();
        break;
      case SearchConstants.SEARCH_NEXT:
        current += 1;
        if (current == _max) {
          current = 0;
        }
        SearchResultsStore.changed();
        break;
      case SearchConstants.SEARCH_BACK:
        if (current === 0) {
          current = _max-1;
        } else {
          current-=1;
        }
        SearchResultsStore.changed();
        break;
    }
  })
});

module.exports = SearchResultsStore;
