// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { resolve } = require('path');
const paths = ['utils'];

module.exports = {
  rootDir: resolve(),
  testURL: 'http://localhost/',
  testRegex: '/*.test.js$',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Coverage
  collectCoverage: true,
  collectCoverageFrom: paths.map(module => `<rootDir>/src/${module}/**/*.js`),
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json'],
};
