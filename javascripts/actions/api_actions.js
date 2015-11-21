var AppDispatcher = require('../dispatcher/dispatcher.js');

var ApiActions = {

  updateQuery: function (location, query) {
    AppDispatcher.dispatch ({
      actionType: "TEST2",
      center: location,
      query: query
    });
  },

  resetMapCenter: function (coords) {
    AppDispatcher.dispatch ({
      actionType: "TEST1",
      center: coords
    });
  },

  updateMarkers: function (arrayOfMarkers, length) {
    AppDispatcher.dispatch ({
      actionType: "TEST",
      markers: arrayOfMarkers,
      length: length
    });
  },

  updateSearchResults: function (searchResults, length) {
    AppDispatcher.dispatch ({
      actionType: "TEST4",
      results: searchResults,
      length: length
    });
  },

  displayPlace: function (result) {
    AppDispatcher.dispatch ({
      actionType: "TEST5",
      result: result
    });
  },

  searchNext: function () {
    AppDispatcher.dispatch ({
      actionType: "NEXT",
    });
  },

  searchBack: function () {
    AppDispatcher.dispatch ({
      actionType: "BACK",
    });
  }
};

module.exports = ApiActions;
