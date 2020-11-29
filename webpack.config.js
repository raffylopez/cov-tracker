/*
 * webpack.config.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

const loaders = require("./loaders.js");
const path = require("path");
module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/public/js"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist/public"),
    compress: true,
    disableHostCheck: true,
  },
  module: {
    rules: [loaders.JSLoader, loaders.CSSLoaders],
  },
};
