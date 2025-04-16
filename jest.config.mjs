/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  preset: 'ts-jest',

  collectCoverage: !process.env.SKIP_COVERAGE,
  collectCoverageFrom: [
    'src/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: process.env.CI
    ? ['json', 'clover', 'cobertura']
    : ['html', 'text'],

  cacheDirectory: 'node_modules/.cache/jest',
  verbose: true,
}

export default config
