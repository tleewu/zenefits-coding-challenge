var AppDispatcher = require('../dispatcher/dispatcher.js');
var SearchConstants = require('../constants/search.js');
var MapConstants = require('../constants/map.js');
var MarkerConstants = require('../constants/marker.js');

var ApiActions = {

  updateQuery: function (location, query) {
    AppDispatcher.dispatch ({
      actionType: SearchConstants.QUERY_UPDATED,
      center: location,
      query: query
    });
  },

  resetMapCenter: function (coords) {
    AppDispatcher.dispatch ({
      actionType: MapConstants.RESET_MAP_CENTER,
      center: coords
    });
  },

  updateMarkers: function (arrayOfMarkers, length) {
    AppDispatcher.dispatch ({
      actionType: MarkerConstants.UPDATE_MARKERS,
      markers: arrayOfMarkers,
      length: length
    });
  },

  updateSearchResults: function (searchResults, length) {
    AppDispatcher.dispatch ({
      actionType: SearchConstants.SEARCH_RESULTS_UPDATED,
      results: searchResults,
      length: length
    });
  },

  displayPlace: function (result) {
    AppDispatcher.dispatch ({
      actionType: SearchConstants.DISPLAY_PLACE,
      result: result
    });
  },

  searchNext: function () {
    AppDispatcher.dispatch ({
      actionType: SearchConstants.SEARCH_NEXT,
    });
  },

  searchBack: function () {
    AppDispatcher.dispatch ({
      actionType: SearchConstants.SEARCH_BACK,
    });
  }
};

module.exports = ApiActions;
