# Zenefits Coding Challenge

This app utilizes the Flux architecture with React.js and incorporates webpack to bundle my Javascript modules.

<b> Prompt: </b> Create a web app (desktop or mobile) that provides a query box and a search button and then calls the Places Library for Google Maps (https://developers.google.com/maps/documentation/javascript/places). Format the results to give a good user experience.

### How to Run This App:

From the command terminal:
1. npm install
2. webpack
3. google-chrome index.html // If this does not work, you can also open up the index.html on your browser of choice.

### Displaying search results with Flux

<b> Step 1: Handle user's submitted information from search bar. </b>

```
// from SearchBar component ... components/searchbar.jsx

_handleSubmit: function (e) {
  e.preventDefault();
  var location = this.state.location;
  if (location.length) {
    var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      location + "&key=AIzaSyCgpLQ3tKe3gpdI5oraHqYI6Wu0I4oLf-0";
    ApiUtil.makeSearch(geocodeUrl, this.state.type);
  } else {
    alert ("Please enter a location.");
  }
}
```

<b> Step 2: Use the Google Maps geocode API to convert location search to latitude/longitude data. </b>

```
// from ApiUtil ... util/api_util.js

makeSearch: function (geocodeUrl, query) {
  $.ajax ({
    url: geocodeUrl,
    success: function (result) {
      ApiActions.updateQuery (result.results[0].geometry.location, query);
    }
  });
},
```

<b> Step 3: Use action to let the dispatcher that a change has occurred. </b>

```
// from ApiActions ... actions/api_actions.js

updateQuery: function (location, query) {
  AppDispatcher.dispatch ({
    actionType: SearchConstants.QUERY_UPDATED,
    center: location,
    query: query
  });
}
```

<b> Step 4: Update the SearchResults Store. </b>

```
// from SearchResultsStore ... store/searchresults.js

case SearchConstants.SEARCH_RESULTS_UPDATED:
  _results = action.results;
  _max = action.length;
  current = 0;
  SearchResultsStore.changed();
  break;
```

<b> Step 5: SearchResults component is now prompted to update its information. </b>

```
// from SearchResults component ... components/searchresults.jsx

_displayResult: function () {
  this.setState({result: SearchResultsStore.get()});
},

componentDidMount: function () {
  SearchResultsStore.addChangeListener(this._displayResult);
}
```

Flux is powerful and awesome! :)
