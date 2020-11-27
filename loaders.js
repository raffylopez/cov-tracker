/*
 * loaders.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
const JSLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader'
  }]
}

const CSSLoaders = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader','postcss-loader']
}

module.exports = {
  JSLoader,
  CSSLoaders
}
