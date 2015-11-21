var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./javascripts/components/map.jsx');
var SearchBar = require('./javascripts/components/searchbar.jsx');
var SearchResults = require('./javascripts/components/searchresult.jsx');


var App = React.createClass({
  render: function() {
    return (
      <div>
        <SearchBar />
        <SearchResults />
        <Map />
      </div>
    );
  }
});

ReactDOM.render(
    <div><App/></div>,
    document.getElementById('content')
);
