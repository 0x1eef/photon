const path = require('path');
const process = require('process');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "inline-source-map",
  entry: {
    index: './src/js/index.tsx',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: { '~': [path.resolve('src/js/')] },
    roots: [path.resolve('src/js'), path.resolve('node_modules')],
    modules: [path.resolve('src/js'), path.resolve('node_modules')],
    extensions: ['.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/html/", to: "html" },
        { from: "src/css/", to: "css" },
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/images", to: "images/" },
        { from: "src/_locales", to: "_locales/" }
      ],
    }),
    new CleanWebpackPlugin(),
  ],
}
