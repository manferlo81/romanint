/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: !process.env.NO_COVERAGE,
  collectCoverageFrom: [
    'src/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: process.env.CI
    ? ['json', 'clover', 'cobertura']
    : ['html', 'text'],

  verbose: true,
};

export default config;
