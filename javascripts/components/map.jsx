var React = require('react');
var ReactDOM = require('react-dom');

var MapStore = require('../store/map.js');

var Map = React.createClass({

  _updateMap: function () {
    var request = {
      location: new google.maps.LatLng(-33.8665433,151.1956316),
      radius: '500',
      query: MapStore.getQuery()
    };

    var service = new google.maps.places.PlacesService(this.map);
    var that = this;
    service.textSearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          that._createMarker(results[i]);
        }
      } else {
        console.log("test");
      }
    });
    // this.map.setCenter(MapStore.getCenter());
  },

  _createMarker:  function (place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name + "<br />" + place.formatted_address +"<br />" + place.website + "<br />" + place.rating + "<br />" + place.formatted_phone_number);
      infowindow.open(this.map, this);
    });
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
