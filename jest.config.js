export default {
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.json'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.m?js$': '$1',
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '\\.tsx?$': [
        'ts-jest',
        {
          useESM: true,
        },
      ],
    },
    testMatch: [
      '<rootDir>/__tests__/**/*.(test|spec).{ts,tsx}'
    ],
    collectCoverageFrom: ['<rootDir>/src/**/*.*ts'],
    testEnvironment: 'jest-environment-jsdom',
    bail: true,
    coveragePathIgnorePatterns: [
      '<rootDir>/src/main\\.m?ts$',
      '.*\\.module\\.m?ts$',
      '<rootDir>/src/health/',
    ],
    coverageReporters: ['lcov', 'text-summary', 'html'],
    errorOnDeprecated: true,
    testTimeout: 60000,
    verbose: true,
  };
  