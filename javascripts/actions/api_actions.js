var AppDispatcher = require('../dispatcher/dispatcher.js');

var ApiActions = {
  resetMapCenter: function (center) {
    AppDispatcher.dispatch ({
      actionType: "TEST",
      center: center
    });
  },

  updateQuery: function (query) {
    AppDispatcher.dispatch ({
      actionType: "TEST2",
      query: query
    });
  }
};

module.exports = ApiActions;
