var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./javascripts/components/map.jsx');
var SearchBar = require('./javascripts/components/searchbar.jsx');
var SearchResults = require('./javascripts/components/searchresult.jsx');


var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <SearchBar />

        <div className="row">
          <div className="col-md-6">
            <Map />
          </div>
          <div className="col-md-6">
            <SearchResults />
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
    <div><App/></div>,
    document.getElementById('content')
);
