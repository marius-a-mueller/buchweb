/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
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
    testMatch: ['<rootDir>/__tests__/**/*.(test|spec).{ts,tsx}'],
    collectCoverageFrom: ['<rootDir>/src/**/*.*ts'],
    testEnvironment: 'jest-environment-jsdom',
    bail: true,
    coveragePathIgnorePatterns: [
        String.raw`<rootDir>/src/main\.m?ts$`,
        String.raw`.*\.module\.m?ts$`,
        '<rootDir>/src/health/',
    ],
    coverageReporters: ['lcov', 'text-summary', 'html'],
    errorOnDeprecated: true,
    testTimeout: 60_000,
    verbose: true,
};
