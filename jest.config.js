/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
module.exports = {
  projects: [
    '<rootDir>/packages/*',
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.(test|spec).js'
  ],
  moduleFileExtensions: [
    'js', 'json'
  ]
}
