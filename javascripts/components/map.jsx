var React = require('react');
var ReactDOM = require('react-dom');

var MapStore = require('../store/map.js');
var MarkerStore = require('../store/marker.js');

var ApiActions = require('../actions/api_actions.js');

var Map = React.createClass({

  getInitialState: function () {
    return ({markers: []});
  },

  _updateMarkers: function () {
    var oldMarkers = this.state.markers.slice(0);
    var bouncing = MarkerStore.getBounce();
    for (var i = 0; i < oldMarkers.length; i++) {
      oldMarkers[i].setMap(null);
    }

    var newMarkers = MarkerStore.all();
    for (var j = 0; j < newMarkers.length; j++) {
      newMarkers[j].setMap(this.map);
      if (bouncing == j) {
        newMarkers[j].setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    this.setState({markers: newMarkers});
  },

  _updateMap: function () {
    var that = this;

    this.map.setCenter(MapStore.getCenter());
    if (MapStore.getQuery().length > 0) {
      var markers = [];
      var searchResults = [];

      var request = {
        bounds: this.map.getBounds(),
        query: MapStore.getQuery(),
        radius: '500'
      };

      var service = new google.maps.places.PlacesService(this.map);
      service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var length = 10;
          if (results.length < 10) {
            length = results.length;
          }
          for (var i = 0; i < length; i++) {
            var marker = new google.maps.Marker ({
              map: that.map,
              position: results[i].geometry.location
            });
            markers.push(marker);
            searchResults.push(results[i]);
          }
          ApiActions.updateMarkers(markers, length);
          ApiActions.updateSearchResults(searchResults, length);
        }
      });
    }

  },

  updateMapWhenMoved: function () {
    var coords = this.map.getCenter();
    ApiActions.resetMapCenter({lat: coords.lat(), lng: coords.lng()});
  },

  componentDidMount: function () {
    MapStore.addChangeListener(this._updateMap);
    MarkerStore.addChangeListener(this._updateMarkers);
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7833, lng: -122.4167},
      zoom: 15
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.map.addListener('idle', this.updateMapWhenMoved);
  },

  render: function () {
    return (
      <div className="map" ref="map"/>
    )
  }
});

module.exports = Map;
