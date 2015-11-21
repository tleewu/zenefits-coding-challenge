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

  render: function () {
    var result = "";
    if (this.state.result.name) {
      result = this.state.result.name;
    }
    return (
      <div>
        test
        {result}
      </div>
    )
  }
});

module.exports = SearchResults;
