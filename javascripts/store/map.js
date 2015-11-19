var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;

'use strict';

var _center = {lat: null, lng: null},
        CHANGE = "CHANGE";

var MapStore = $.extend({}, EventEmitter.prototype, {

  getCenter: function () {
    return _center;
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
        _center = action.center;
        MapStore.changed();
        break;
    }
  })
});

module.exports = MapStore;
