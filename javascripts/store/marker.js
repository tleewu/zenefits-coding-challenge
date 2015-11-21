var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;

'use strict';

var _markers = [];
var _bouncing = 0;
var _max = 1;

CHANGE = "CHANGE";

var MarkerStore = $.extend({}, EventEmitter.prototype, {
  all: function () {
    return _markers.slice(0);
  },

  getBounce: function () {
    return _bouncing;
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
        _max = action.length;
        MarkerStore.changed();
        break;
      case "NEXT":
        _bouncing += 1;
        if (_bouncing == _max) {
          _bouncing = 0;
        }
        MarkerStore.changed();
        break;
      case "BACK":
        if (_bouncing === 0) {
          _bouncing = _max-1;
        } else {
          _bouncing-=1;
        }
        MarkerStore.changed();
        break;
    }
  })
});

module.exports = MarkerStore;
