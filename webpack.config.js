var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./app.jsx",
  output: {
    path: path.join(__dirname, 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  }
};
