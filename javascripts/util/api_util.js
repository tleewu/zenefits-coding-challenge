var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
  findGeocode: function (geocodeUrl) {
    $.ajax ({
      url: geocodeUrl,
      success: function (result) {
        ApiActions.resetMapCenter (result.results[0].geometry.location);
      }
    });
  }
};

module.exports = ApiUtil;
