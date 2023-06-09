process.env.ethTest = 'TransactionTests'

module.exports = function (config) {
  config.set({
    browserNoActivityTimeout: 60000,
    frameworks: ['karma-typescript', 'tap'],
    files: ['./test/**/*.ts', './src/**/*.ts'],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        acornOptions: {
          ecmaVersion: 13,
        },
        ignore: ['c-kzg', 'safer-buffer'],
        resolve: {
          alias: {
            '@ethereumjs/util/provider': '../util/dist/cjs/provider.js',
          },
        },
      },
    },
    browsers: ['FirefoxHeadless', 'ChromeHeadless'],
    concurrency: 1,
    singleRun: true,
  })
}
