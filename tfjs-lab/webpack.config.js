module.exports = {
  mode: 'development',
  entry: './script.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  devtool: 'source-map'
}
