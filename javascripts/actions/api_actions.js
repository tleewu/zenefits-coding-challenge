var AppDispatcher = require('../dispatcher/dispatcher.js');

var ApiActions = {
  resetMapCenter: function (center) {
    AppDispatcher.dispatch ({
      actionType: "TEST",
      center: center
    });
  }
};

module.exports = ApiActions;
