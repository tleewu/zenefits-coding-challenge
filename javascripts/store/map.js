var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;

'use strict';

var _center = {lat: 37.7833, lng: -122.4167};
var _query = {};

CHANGE = "CHANGE";

var MapStore = $.extend({}, EventEmitter.prototype, {

  getCenter: function () {
    return _center;
  },

  getQuery: function () {
    return _query;
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
      case "TEST2":
        _query = action.query;
        MapStore.changed();
        break;


    }
  })
});

module.exports = MapStore;
