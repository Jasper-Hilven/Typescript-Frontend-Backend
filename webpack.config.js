var webpack = require('webpack');
module.exports = {
  entry: './src/frontend/app.ts',
  output: {
      filename: './dist/bundle.js',
  },
  resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
      //extensions: ['.ts']
  },
  module: {
      loaders: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
  },
  plugins: []//[new webpack.optimize.UglifyJsPlugin({minimize: false})]
};
