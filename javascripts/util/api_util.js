var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
  findGeocode: function (geocodeUrl, query) {
    $.ajax ({
      url: geocodeUrl,
      success: function (result) {
        ApiActions.updateQuery (result.results[0].geometry.location, query);
      }
    });
  }
};

module.exports = ApiUtil;
