module.exports = {
  entry: './index',

  output: {
    filename: 'app.js',
  },

  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts', exclude: 'node_modules'}
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  },

  devServer: {
    compress: true,
    port: 1313
  }
};
