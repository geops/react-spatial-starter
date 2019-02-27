const { version } = require('./package.json');

module.exports = {
  title: `geOps react-spatial Starter ${version}`,

  sections: [
    {
      name: '',
      content: 'README.md',
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Load css and scss files.
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader?modules'],
        },
      ],
    },
  },
};
