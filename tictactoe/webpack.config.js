var webpack = require("webpack");
var path = require("path");
 
var ENTRY = path.resolve(__dirname, "entry");
var COMPONENTS = path.resolve(__dirname, "components");
var OUTPUT = path.resolve(__dirname, "output");
 
var config = {
  entry: ENTRY + "/index.js",
  output: {
    path: OUTPUT,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
        include: [
          ENTRY,
          COMPONENTS
        ],
        loader: "babel-loader",
    }]
  }
};
 
module.exports = config;