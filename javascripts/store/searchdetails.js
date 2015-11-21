var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/search.js');

'use strict';

var _result = {};
CHANGE = "CHANGE";

var SearchDetailsStore = $.extend({}, EventEmitter.prototype, {

  get: function () {
    return _result;
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
      case SearchConstants.DISPLAY_PLACE:
        _result = action.result;
        SearchDetailsStore.changed();
        break;

    }
  })
});

module.exports = SearchDetailsStore;
