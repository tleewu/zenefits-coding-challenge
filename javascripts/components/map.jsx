var React = require('react');
var ReactDOM = require('react-dom');

var MapStore = require('../store/map.js');

var Map = React.createClass({

  getInitialState: function () {
    return ({markers: []});
  },

  _clearAllMarkers: function () {
    this.state.markers.forEach (function (marker) {
      marker.setMap(null);
    });
    this.setState({markers: []});
  },

  _updateMap: function () {
    var markers = [];
    var that = this;

    this._clearAllMarkers();
    this.map.setCenter(MapStore.getCenter());

    var request = {
      bounds: this.map.getBounds(),
      keyword: MapStore.getQuery()
    };

    var service = new google.maps.places.PlacesService(this.map);
    service.radarSearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < 10; i++) {
          markers.push(that._createMarker(results[i]));
        }
      }
    });
    this.setState({markers: markers});
  },

  _createMarker:  function (place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
    return marker;
  },

  componentDidMount: function () {
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7833, lng: -122.4167},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    MapStore.addChangeListener(this._updateMap);
  },

  render: function () {
    return (
      <div className="map" ref="map"/>
    )
  }
});

module.exports = Map;
