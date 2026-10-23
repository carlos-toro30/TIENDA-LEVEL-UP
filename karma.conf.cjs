const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
if (!process.env.CHROME_BIN && fs.existsSync(edgePath)) {
  process.env.CHROME_BIN = edgePath;
}

module.exports = function configureKarma(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'tests/**/*.spec.jsx', watched: false },
    ],
    preprocessors: {
      'tests/**/*.spec.jsx': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.jsx', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [
                  ['babel-plugin-istanbul', { exclude: ['**/*.spec.jsx'] }],
                ],
              },
            },
          },
        ],
      },
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
    },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
    singleRun: true,
    concurrency: Infinity,
    client: {
      clearContext: false,
    },
  });
};
