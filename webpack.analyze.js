const merge = require('webpack-merge');
const { BundleAnalyzerPlugin }  = require('webpack-bundle-analyzer');
const prodConfig = require('./webpack.prod.js');

module.exports = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
