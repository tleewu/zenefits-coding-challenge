var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/search.js');
var MapConstants = require('../constants/map.js');

'use strict';

var _center = {lat: 37.7833, lng: -122.4167};
var _query = "";

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
      case SearchConstants.QUERY_UPDATED:
        _query = action.query;
        _center = action.center;
        MapStore.changed();
        break;
      case MapConstants.RESET_MAP_CENTER:
        _center = action.center;
        MapStore.changed();
        break;
    }
  })
});

module.exports = MapStore;
