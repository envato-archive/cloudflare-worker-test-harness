module.exports = {
  entry: './index.js',
  target: 'webworker',
  mode: 'production',

  // Prevent Webpack from getting angry if we bundle a large script
  performance: {
    hints: false,
  },

  // Prevent Webpack from shimming Node features and bloating our Worker scripts
  node: false,
};
