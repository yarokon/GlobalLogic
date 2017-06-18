const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 4000,
      files: ['./index.html', './app/style.css'],
      server: { baseDir: ['./'] }
    })
  ],
  devtool: 'source-map'
};