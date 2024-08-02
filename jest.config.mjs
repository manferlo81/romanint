export default {

  testEnvironment: 'node',
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: !process.env.NO_COVERAGE,
  collectCoverageFrom: [
    'src/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    process.env.CI ? 'json' : 'lcov',
    'text',
    'text-summary',
  ],

  verbose: true,

};
