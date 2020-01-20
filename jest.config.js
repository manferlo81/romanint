module.exports = {

  testEnvironment: 'node',
  browser: false,

  preset: 'ts-jest',
  cacheDirectory: 'node_modules/.cache/jest',

  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'lcov',
    'text'
  ],

  verbose: true,

}
