var React = require('react');
var ReactDOM = require('react-dom');

var ApiUtil = require('../util/api_util.js');

var SearchBar = React.createClass({
  getInitialState: function () {
    return ({location: ""});
  },

  _updateLocation: function (e) {
    e.preventDefault();
    this.setState({location: e.currentTarget.value});
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    var location = this.state.location;
    if (location.length) {
      var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        location + "&key=AIzaSyCgpLQ3tKe3gpdI5oraHqYI6Wu0I4oLf-0";
      ApiUtil.findGeocode(geocodeUrl);
    } else {
      alert ("please enter a location before you submit");
    }
  },

  render: function () {
    return (
      <form onSubmit={this._handleSubmit}>
        <input type="text" placeholder="Search location..." value={this.state.location} onChange={this._updateLocation}/>
        <input type="submit"/>
      </form>
    )
  }
});

module.exports = SearchBar;
