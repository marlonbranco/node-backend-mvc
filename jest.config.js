module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js?(x)',
  ],
};
