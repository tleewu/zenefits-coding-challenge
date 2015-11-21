var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
  makeSearch: function (geocodeUrl, query) {
    $.ajax ({
      url: geocodeUrl,
      success: function (result) {
        ApiActions.updateQuery (result.results[0].geometry.location, query);
      }
    });
  },
};

module.exports = ApiUtil;
