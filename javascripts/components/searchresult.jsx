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
    var result = "";
    if (this.state.result.name) {
      result = <div> {this.state.result.name} {this.state.result.formatted_address} </div>;
    }
    return (
      <div>
        {result}
        <button onClick={this._next}> next </button>
        <button onClick={this._back}> back </button>
      </div>
    )
  }
});

module.exports = SearchResults;
