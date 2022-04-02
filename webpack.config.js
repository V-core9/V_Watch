const path = require('path');

module.exports = {

  entry: './index.js',

  mode: "production",

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname),
  },

  target: "node",

  node: {
    __dirname: true,
  },

  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },

};
