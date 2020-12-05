/*
 * webpack.config.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const loaders = require("./loaders.js");
const path = require("path");
var webpack = require("webpack");

module.exports = {
   context: __dirname,
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, "dist/public"),
      filename: "main.bundle.js",
   },
   devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, "dist/public"),
      compress: true,
      disableHostCheck: true,
   },
   module: {
      rules: [loaders.JSLoader, loaders.CSSLoaders],
   },
   plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "dist", "[name]-manifest.json"),
			name: "[name]_[fullhash]"
		}),
      // new HardSourceWebpacklugin(),
   ]
};
