var React = require('react');
var ReactDOM = require('react-dom');

var MapStore = require('../store/map.js');

var Map = React.createClass({

  // _updateMap: function () {
  //   this.map.setCenter(MapStore.getCenter());
  // },
  //

  _test: function () {
    alert ("success");
  },

  componentDidMount: function () {
    var map = ReactDOM.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7833, lng: -122.4167},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    MapStore.addChangeListener(this._test);
  },

  render: function () {
    return (
      <div className="map" ref="map"/>
    )
  }
});

module.exports = Map;
