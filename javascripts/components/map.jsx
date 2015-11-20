var React = require('react');
var ReactDOM = require('react-dom');

var MapStore = require('../store/map.js');
var MarkerStore = require('../store/marker.js');

var ApiActions = require('../actions/api_actions.js');

var Map = React.createClass({

  getInitialState: function () {
    return ({markers: []});
  },

  _updateMap: function () {
    var markers = [];
    var oldMarkers = this.state.markers.slice(0);
    var that = this;

    this.map.setCenter(MapStore.getCenter());
    if (MapStore.getQuery().length > 0) {
      var request = {
        bounds: this.map.getBounds(),
        keyword: MapStore.getQuery()
      };

      var service = new google.maps.places.PlacesService(this.map);
      service.radarSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < 10; i++) {
            var marker = new google.maps.Marker ({
              map: that.map,
              position: results[i].geometry.location
            });
            marker.setMap(that.map);
            markers.push(marker);
          }
        }
      });

      for (var i = 0; i < oldMarkers.length; i++) {
        oldMarkers[i].setMap(null);
      }
      this.setState({markers: markers});
    }

  },

  updateMapWhenMoved: function () {
    var coords = this.map.getCenter();
    ApiActions.resetMapCenter({lat: coords.lat(), lng: coords.lng()});
  },

  componentDidMount: function () {
    MapStore.addChangeListener(this._updateMap);
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7833, lng: -122.4167},
      zoom: 13
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
