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

  updateMarkers: function (arrayOfMarkers) {
    AppDispatcher.dispatch ({
      actionType: "TEST",
      markers: arrayOfMarkers
    });
  },

  updateSearchResults: function (searchResults) {
    AppDispatcher.dispatch ({
      actionType: "TEST4",
      results: searchResults
    });
  },

  displayPlace: function (result) {
    AppDispatcher.dispatch ({
      actionType: "TEST5",
      result: result
    });
  }
};

module.exports = ApiActions;
