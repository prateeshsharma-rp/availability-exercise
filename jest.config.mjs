/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts', '.mts'],
  moduleFileExtensions: ['ts', 'mts', 'js', 'mjs', 'json', 'node'],
  transform: {
    '^.+\\.m?ts$': ['ts-jest', { useESM: true }],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
};
