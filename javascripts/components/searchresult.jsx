var React = require('react');
var ReactDOM = require('react-dom');

var ApiUtil = require('../util/api_util.js');
var ApiActions = require('../actions/api_actions.js');

var SearchResultsStore = require('../store/searchresults.js');
var SearchDetailsStore = require('../store/searchdetails.js');

var SearchResults = React.createClass({
  getInitialState: function () {
    return ({result: {}});
  },

  _displayResult: function () {
    this.setState({result: SearchResultsStore.get()});
  },

  componentDidMount: function () {
    SearchResultsStore.addChangeListener(this._displayResult);
  },

  _next: function () {
    ApiActions.searchNext();
  },

  _back: function () {
    ApiActions.searchBack();
  },

  render: function () {
    var button = "";
    var image = "";
    var address = "";
    var name = "";
    var tags = "";
    if (this.state.result.name) {
      tags = [];
      this.state.result.types.forEach(function (tag) {
        tags.push(<span className="tags"> {tag} </span>);
        if (tags.length % 4 === 0) {
          tags.push(<div><br/></div>);
        }
      });

      image = <img src={this.state.result.icon} height="75px" width="75px"/>;
      name = <div className="place-name"> {this.state.result.name.toUpperCase()} </div>;
      address = <div className="place-address"> {this.state.result.formatted_address.toUpperCase()} </div>;
      button = <div> <button className="back" onClick={this._back}> <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> </button> <button className="next" onClick={this._next}> <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> </button> </div>;
    }
    return (
      <div className="search-results">
        {image}
        {name}
        {address}
        {tags}
        {button}
      </div>
    )
  }
});

module.exports = SearchResults;
