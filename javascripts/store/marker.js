var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;

'use strict';

var _markers = [];

CHANGE = "CHANGE";

var MarkerStore = $.extend({}, EventEmitter.prototype, {
  all: function () {
    return _markers.slice(0);
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
      case "TEST":
        _markers = action.markers;
        MarkerStore.changed();
        break;
    }
  })
});

module.exports = MarkerStore;
