var React = require('react');
var ReactDOM = require('react-dom');

var ApiUtil = require('../util/api_util.js');
var ApiActions = require('../actions/api_actions.js');

var SearchBar = React.createClass({
  getInitialState: function () {
    return ({location: "", type: ""});
  },

  _updateLocation: function (e) {
    e.preventDefault();
    this.setState({location: e.currentTarget.value});
  },

  _updateType: function (e) {
    e.preventDefault();
    this.setState({type: e.currentTarget.value});
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    var location = this.state.location;
    if (location.length) {
      var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        location + "&key=AIzaSyCgpLQ3tKe3gpdI5oraHqYI6Wu0I4oLf-0";
      ApiUtil.findGeocode(geocodeUrl, this.state.type);
    } else {
      alert ("Please enter a location.");
    }
  },

  render: function () {
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="container">
          <div className="col-md-5" id="search">
            <input type="text" className="search-bar" placeholder="What are you looking for? Pizza, bars, cafes, sports..." value={this.state.type} onChange={this._updateType}/>
          </div>
          <div className="col-md-5" id="search">
            <input type="text" className="search-bar" placeholder="Search location..." value={this.state.location} onChange={this._updateLocation}/>
          </div>
          <div className="col-md-2" id="search">
            <input type="submit" id="submit" className="search-bar" value="Search"/>
          </div>
        </div>
        <br/>
      </form>
    )
  }
});

module.exports = SearchBar;
