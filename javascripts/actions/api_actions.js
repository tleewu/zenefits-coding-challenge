var AppDispatcher = require('../dispatcher/dispatcher.js');

var ApiActions = {

  updateQuery: function (location, query) {
    AppDispatcher.dispatch ({
      actionType: "TEST2",
      center: location,
      query: query
    });
  }
};

module.exports = ApiActions;
